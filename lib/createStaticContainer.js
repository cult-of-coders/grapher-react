import React from 'react';

/**
 * Wraps the query and provides static data fetching utility
 *
 * @param props
 * @param handler
 * @param config
 * @param staticQueryContainer
 */
export default function createStaticContainer(props, handler, config, staticQueryContainer) {
    const query = handler(props);

    return React.createElement(staticQueryContainer, {
        query,
        props,
        config
    })
}