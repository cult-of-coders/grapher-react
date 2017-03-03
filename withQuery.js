import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { SimpleSchema } from 'simpl-schema';

export default (query, options = {}) => {
    (new SimpleSchema({
        reactive: { type: Boolean, defaultValue: false },
        single: { type: Boolean, defaultValue: false },
        dataProp: { type: String, defaultValue: 'data' }
    })).clean(options);

    return (component) => {
        if (options.reactive) {
            return createContainer((props) => {
                if (props.params) {
                    query.setParams(props.params);
                }

                const handler = query.subscribe();

                return {
                    query,
                    loading: !handler.ready(),
                    [options.dataProp]: options.single ? _.first(query.fetch()) : query.fetch(),
                    ...props
                }
            }, component);
        }

        class MethodQueryComponent extends React.Component {
            constructor() {
                super();
                this.state = {
                    [options.dataProp]: undefined,
                    error: undefined,
                    loading: true
                }
            }

            componentWillReceiveProps(nextProps) {
                this._fetch(nextProps.params);
            }

            componentDidMount() {
                this._fetch(this.props.params);
            }

            _fetch(params) {
                if (params) {
                    query.setParams(params);
                }

                query.fetch((error, data) => {
                    const state = {
                        error,
                        [options.dataProp]: options.single ? _.first(data) : data,
                        loading: false
                    };

                    this.setState(state);
                });
            }

            render() {
                const { state, props } = this;

                return React.createElement(component, {
                    query,
                    ...state,
                    ...props
                })
            }
        }

        MethodQueryComponent.propTypes = {
            params: React.PropTypes.object
        };

        return MethodQueryComponent;
    }
}