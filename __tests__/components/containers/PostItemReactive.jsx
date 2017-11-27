import React from 'react';
import {withQuery} from 'meteor/cultofcoders:grapher-react';
import {authorsList, postsList} from '../../bootstrap/namedQueries';
import Post from '../dumb/Post';

export default withQuery(() => {
    return postsList.clone()
}, {
    single: true,
    reactive: true,
})(Post);
