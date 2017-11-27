import React from 'react';

const Error = ({error}) => {
    return <div>{error.reason}</div>
};

export default Error;