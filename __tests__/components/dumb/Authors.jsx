import React from 'react';
import Loading from './Loading';
import Error from './Error';

const Authors = ({data, isLoading, error}) => {
    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <Error error={error} />;
    }

    return (
        <ul>
            {data.map(author => <li key={author._id}>{author.name}</li>)}
        </ul>
    )
};

export default Authors;