import React from 'react';
import defaults from './defaults';
import withReactiveQuery from './lib/withReactiveQuery';
import withQueryContainer from './lib/withQueryContainer';
import withStaticQuery from './lib/withStaticQuery';
import checkOptions from './lib/checkOptions';
import { SSRDataStoreContext } from './lib/SSRDataStore.js';
import hoistNonReactStatic from 'hoist-non-react-statics';
import withUser from './lib/User';

export default function(handler, _config = {}) {
  checkOptions(_config);
  const config = Object.assign({}, defaults, _config);

  // Return a function that wraps a given component
  return function(component) {
    let C; // C will be the new wrapped component that we return
    const queryContainer = withQueryContainer(component);

    // Non-reactive queries use the withStaticQuery HOC
    if (!config.reactive) {
      const StaticQueryContainer = withStaticQuery(queryContainer);

      C = function withQuery(props) {
        const query = handler(props);

        const { user, ...remainingProps } = props;

        return (
          <SSRDataStoreContext.Consumer>
            {dataStore => (
              <StaticQueryContainer
                query={query}
                user={user}
                props={remainingProps}
                config={config}
                dataStore={dataStore}
              />
            )}
          </SSRDataStoreContext.Consumer>
        );
      };
    } else {
      // Reactive queries use the withReactiveQuery HOC
      const ReactiveQueryContainer = withReactiveQuery(
        handler,
        config,
        queryContainer
      );
      C = function withQuery(props) {
        return (
          <SSRDataStoreContext.Consumer>
            {dataStore => (
              <ReactiveQueryContainer {...props} dataStore={dataStore} />
            )}
          </SSRDataStoreContext.Consumer>
        );
      };
    }

    // Convention: Wrap the Display Name for Easy Debugging
    // https://reactjs.org/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging
    C.displayName = `withQuery(${component.displayName || component.name})`;

    // Static Methods Must Be Copied Over
    // https://reactjs.org/docs/higher-order-components.html#static-methods-must-be-copied-over
    hoistNonReactStatic(C, component);

    return withUser(C);

    // return C;
  };
}
