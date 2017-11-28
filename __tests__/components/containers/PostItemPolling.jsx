import React from 'react';
import {withQuery} from 'meteor/cultofcoders:grapher-react';
import {authorsList, postsList} from '../../bootstrap/namedQueries';
import Post from '../dumb/Post';

export default withQuery(() => {
    return postsList.clone({
        options: {limit: 1}
    })
}, {
    single: true,
    pollingMs: 100,
})(Post);
