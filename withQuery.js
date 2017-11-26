import React from 'react';
import defaults from './defaults';
import {withTracker} from 'meteor/react-meteor-data';
import createReactiveContainer from './lib/createReactiveContainer';
import createStaticContainer from './lib/createStaticContainer';
import withQueryContainer from './lib/withQueryContainer';
import withStaticQueryContainer from './lib/withStaticQueryContainer';

export default function (handler, _config = {}) {
    const config = Object.assign({}, defaults, _config);

    const createContainer = config.reactive ? createReactiveContainer : createStaticContainer;

    return function (component) {
        let container = withQueryContainer(component);
        if (!config.reactive) {
            container = withStaticQueryContainer(container);
        }

        return function (props) {
            return createContainer(props, handler, config, container)
        }
    };
}