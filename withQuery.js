import React from 'react';
import defaults from './defaults';
import {withTracker} from 'meteor/react-meteor-data';
import withReactiveQuery from './lib/withReactiveQuery';
import withQueryContainer from './lib/withQueryContainer';
import withStaticQuery from './lib/withStaticQuery';
import checkOptions from './lib/checkOptions';
import { SSRDataStoreContext } from './lib/SSRDataStore.js'

export default function (handler, _config = {}) {
    checkOptions(_config);
    const config = Object.assign({}, defaults, _config);

    return function (component) {
        const queryContainer = withQueryContainer(component);

        if (!config.reactive) {
            const StaticQueryContainer = withStaticQuery(queryContainer);

            return function (props) {
                const query = handler(props);

                return (
                    <SSRDataStoreContext.Consumer>
                        {dataStore => <StaticQueryContainer query={query} props={props} config={config} dataStore={dataStore} />}
                    </SSRDataStoreContext.Consumer>
                )
            }
        } else {
            const ReactiveQueryContainer = withReactiveQuery(handler, config, queryContainer);
            return function(props) { 
                return (
                    <SSRDataStoreContext.Consumer>
                        {dataStore => <ReactiveQueryContainer {...props} dataStore={dataStore} />}
                    </SSRDataStoreContext.Consumer>
                )
            }
        }
    };
}