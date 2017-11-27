import {withTracker} from 'meteor/react-meteor-data';
import {ReactiveVar} from 'meteor/reactive-var';

/**
 * Wraps the query and provides reactive data fetching utility
 *
 * @param handler
 * @param config
 * @param QueryComponent
 */
export default function withReactiveContainer(handler, config, QueryComponent) {
    let subscriptionError = new ReactiveVar();

    return withTracker((props) => {
        const query = handler(props);

        const subscriptionHandle = query.subscribe({
            onStop(err) {
                if (err) {
                    subscriptionError.set(err);
                }
            },
            onReady() {
                subscriptionError.set(null);
            }
        });

        const isReady = subscriptionHandle.ready();

        const data = query.fetch();

        return {
            grapher: {
                isLoading: !isReady,
                data,
                error: subscriptionError,
            },
            query,
            config,
            props,
        }
    })(errorTracker(QueryComponent))
}

const errorTracker = withTracker((props) => {
    const error = props.grapher.error.get();

    return {
        ...props,
        grapher: {
            ...props.grapher,
            error,
        }
    };
});