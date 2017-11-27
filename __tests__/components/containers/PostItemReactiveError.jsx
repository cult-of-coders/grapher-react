import React from 'react';
import {withQuery} from 'meteor/cultofcoders:grapher-react';
import {authorsList, postsList, exceptionPostList} from '../../bootstrap/namedQueries';
import Post from '../dumb/Post';

export default withQuery(() => {
    return exceptionPostList.clone()
}, {
    reactive: true,
})(Post);
