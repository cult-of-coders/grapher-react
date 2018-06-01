import React from 'react';
import Loading from './Loading';
import Error from './Error';

const PostWithDataProp = ({post, isLoading, error}) => {
    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <Error error={error} />;
    }

    return <div className="title">{post.title}</div>
};

export default PostWithDataProp;
