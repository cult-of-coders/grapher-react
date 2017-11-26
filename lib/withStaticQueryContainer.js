import React from 'react';
import getDisplayName from './getDisplayName';

export default function withStaticQueryContainer(WrappedComponent) {
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
            const {query} = nextProps;
            this.fetch(query);
        }

        componentDidMount() {
            const {query} = this.props;
            this.fetch(query);
        }

        fetch(query) {
            query.fetch((error, data) => {
                if (error) {
                    this.setState({
                        error,
                        data: [],
                    })
                } else {
                    this.setState({
                        error: null,
                        data
                    });
                }
            });
        }

        refetch = () => {
            const {query} = this.props;
            this.fetch(query);
        };

        render() {
            const {config, queryContainer, props} = this.props;

            Object.assign(props, {
                refetch: this.refetch
            });

            return React.createElement(WrappedComponent, {
                grapher: this.state,
                config,
                props,
            });
        }
    }

    GrapherStaticQueryContainer.displayName = `StaticQuery(${getDisplayName(WrappedComponent)})`;

    return GrapherStaticQueryContainer;
}