import React from 'react';
import Loading from './Loading';
import Error from './Error';

const Post = ({data, isLoading, error}) => {
    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <Error error={error} />;
    }

    return <div className="title">{data.title}</div>
};

export default Post;
