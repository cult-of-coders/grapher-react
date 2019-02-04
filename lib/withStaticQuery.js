import React from 'react';
import getDisplayName from './getDisplayName';

export default function withStaticQueryContainer(config) {
    return function(WrappedComponent) {
        /**
         * We use it like this so we can have naming inside React Dev Tools
         * This is a standard pattern in HOCs
         */
        class GrapherStaticQueryContainer extends React.Component {
            state = {
                isLoading: true,
                error: null,
                data: [],
            };

            componentWillReceiveProps(nextProps) {
                const { query } = nextProps;
                
                if (config.shouldRefetch && config.shouldRefetch(nextProps)) {
                    this.fetch(query);
                }
                
                if (!config.shouldRefetch) {
                    this.fetch(query);
                }
            }

            componentDidMount() {
                const { query, config } = this.props;
                this.fetch(query);

                if (config.pollingMs) {
                    this.pollingInterval = setInterval(() => {
                        this.fetch(query);
                    }, config.pollingMs);
                }
            }

            componentWillUnmount() {
                this.pollingInterval && clearInterval(this.pollingInterval);
            }

            fetch(query) {
                query.fetch((error, data) => {
                    if (error) {
                        this.setState({
                            error,
                            data: [],
                            isLoading: false,
                        });
                    } else {
                        this.setState({
                            error: null,
                            data,
                            isLoading: false,
                        });
                    }
                });
            }

            refetch = () => {
                const { loadOnRefetch = true } = config;
                const { query } = this.props;

                if (loadOnRefetch) {
                    this.setState({ isLoading: true }, () => {
                        this.fetch(query);
                    });
                } else {
                    this.fetch(query);
                }
            };

            render() {
                const { config, props, query } = this.props;

                return React.createElement(WrappedComponent, {
                    grapher: this.state,
                    config,
                    query,
                    props: { ...props, refetch: this.refetch },
                });
            }
        }

        GrapherStaticQueryContainer.displayName = `StaticQuery(${getDisplayName(
            WrappedComponent,
        )})`;

        return GrapherStaticQueryContainer;
    };
}
