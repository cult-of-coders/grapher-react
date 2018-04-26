import { withTracker } from 'meteor/react-meteor-data';
import { ReactiveVar } from 'meteor/reactive-var';
import DataHydrator from './DataHydrator.js';
import { Meteor } from 'meteor/meteor';

/**
 * Wraps the query and provides reactive data fetching utility
 *
 * @param handler
 * @param config
 * @param QueryComponent
 */
export default function withReactiveContainer(handler, config, QueryComponent) {
  let subscriptionError = new ReactiveVar();

  return withTracker(props => {
    const query = handler(props);

    let isLoading;
    let data;
    let error;

    // For server-side-rendering, immediately fetch the data
    // and save it in the data store for this request

    if (Meteor.isServer) {
      try {
        data = query.fetch();
      } catch (e) {
        error = e.message;
      }
      isLoading = false;
      props.dataStore.add(query, data);
    } else {
      const subscriptionHandle = query.subscribe({
        onStop(err) {
          if (err) {
            subscriptionError.set(err);
          }
        },
        onReady() {
          subscriptionError.set(null);
        },
      });

      isLoading = !subscriptionHandle.ready();

      // Check the SSR query store for data
      if (Meteor.isClient && window && window.grapherQueryStore) {
        const ssrData = DataHydrator.getQueryData(query);
        if (ssrData) {
          isLoading = false;
          data = ssrData;
        }
      }

      if (!data) {
        data = query.fetch();
      }
    }

    return {
      grapher: {
        isLoading,
        data,
        error: subscriptionError || error,
      },
      query,
      config,
      props,
    };
  })(errorTracker(QueryComponent));
}

const errorTracker = withTracker(props => {
  const error = props.grapher.error.get();

  return {
    ...props,
    grapher: {
      ...props.grapher,
      error,
    },
  };
});
