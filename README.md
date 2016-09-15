Grapher-React Components
========================

Using the [cultofcoders:grapher](https://github.com/cult-of-coders/grapher) query component in React.

createQueryContainer
--------------------
```
import React from 'react';
import Tasks from '/imports/api/tasks/collection.js';
import { createQueryContainer } from 'meteor/cultofcoders:grapher-react';

const query = Tasks.createQuery({
    title: 1
})

const Tasks = ({loading, error, tasks}) => (
    _.map(tasks, task => <div>{task.title}</div>)
);

export default createQueryContainer(query, Tasks, {
    reactive: true // defaults to false, will use pub/sub system
    dataProp: 'tasks' // defaults to 'data'
})
```
