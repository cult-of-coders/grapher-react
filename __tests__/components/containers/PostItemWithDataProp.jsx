import React from 'react';
import {withQuery} from 'meteor/cultofcoders:grapher-react';
import {postsList} from '../../bootstrap/namedQueries';
import PostWithDataProp from '../dumb/PostWithDataProp';

export default withQuery(() => {
    return postsList.clone()
}, {
    single: true,
    dataProp: 'post',
})(PostWithDataProp);
