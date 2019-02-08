import React from 'react';
import { check, Match } from 'meteor/check';

export default function(options) {
    check(options, {
        reactive: Match.Maybe(Boolean),
        single: Match.Maybe(Boolean),
        pollingMs: Match.Maybe(Number),
        errorComponent: Match.Maybe(Match.Any),
        loadingComponent: Match.Maybe(Match.Any),
        dataProp: Match.Maybe(String),
        loadOnRefetch: Match.Maybe(Boolean),
        shouldRefetch: Match.Maybe(Function),
    });

    if (options.reactive && options.poll) {
        throw new Meteor.Error(
            `You cannot have a query that is reactive and it is with polling`
        );
    }
}
