import {withTracker} from 'meteor/react-meteor-data';

/**
 * Wraps the query and provides reactive data fetching utility
 *
 * @param props
 * @param handler
 * @param config
 * @param queryContainer
 */
export default function createReactiveContainer(props, handler, config, queryContainer) {
    let subscriptionError;

    return withTracker((props) => {
        const query = handler(props);

        const subscriptionHandle = query.subscribe({
            onStop(err) {
                if (err) {
                    subscriptionError = err;
                }
            },
            onReady() {
                subscriptionError = null;
            }
        });

        const isReady = subscriptionHandle.ready();

        return {
            grapher: {
                isLoading: !isReady,
                data: query.fetch(),
                error: subscriptionError,
            },
            config,
            props,
        }
    })(queryContainer)
}