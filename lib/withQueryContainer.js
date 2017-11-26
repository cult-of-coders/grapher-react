import React from 'react';
import PropTypes from 'prop-types';
import {Query, NamedQuery} from 'meteor/cultofcoders:grapher-react';
import getDisplayName from './getDisplayName';

const propTypes = {
    grapher: PropTypes.shape({
        isLoading: PropTypes.bool.isRequired,
        error: PropTypes.object,
        data: PropTypes.array,
        query: PropTypes.oneOfType([
            PropTypes.instanceOf(Query),
            PropTypes.instanceOf(NamedQuery),
        ])
    }).isRequired,
    config: PropTypes.object.isRequired,
    props: PropTypes.object,
    component: PropTypes.element.isRequired,
};


export default function withQueryContainer(WrappedComponent) {
    let GrapherQueryContainer = function({grapher, config, props}) {
        const {isLoading, error, data, query} = grapher;

        if (error && config.errorComponent) {
            return React.createElement(config.errorComponent, {
                error,
                query,
            })
        }

        if (isLoading && config.loadingComponent) {
            return React.createElement(config.loadingComponent, {
                query,
            })
        }

        return React.createElement(WrappedComponent, {
            ...props,
            isLoading,
            error,
            data: config.single ? data[0] : data,
            query
        })
    };

    GrapherQueryContainer.propTypes = propTypes;
    GrapherQueryContainer.displayName = `GrapherQuery(${getDisplayName(WrappedComponent)})`;

    return GrapherQueryContainer;
}
