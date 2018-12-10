import React from 'react';
import defaults from './defaults';
import { withTracker } from 'meteor/react-meteor-data';
import withReactiveQuery from './lib/withReactiveQuery';
import withQueryContainer from './lib/withQueryContainer';
import withStaticQuery from './lib/withStaticQuery';
import checkOptions from './lib/checkOptions';

export default function(handler, _config = {}) {
    checkOptions(_config);
    const config = Object.assign({}, defaults, _config);

    return function(component) {
        const queryContainer = withQueryContainer(component);

        if (!config.reactive) {
            const staticQueryContainer = withStaticQuery(config)(
                queryContainer,
            );

            return function(props) {
                const query = handler(props);

                return React.createElement(staticQueryContainer, {
                    query,
                    props,
                    config,
                });
            };
        } else {
            return withReactiveQuery(handler, config, queryContainer);
        }
    };
}
