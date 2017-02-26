Grapher-React Components
========================

Using the [cultofcoders:grapher](https://github.com/cult-of-coders/grapher) query component in React.

createQueryContainer
--------------------
```js
// TaskList.jsx
import React from 'react';
import Tasks from '/imports/api/tasks/collection.js';
import { createQueryContainer } from 'meteor/cultofcoders:grapher-react';

const query = Tasks.createQuery({
    title: 1,
});

const TaskList = ({loading, error, tasks}) => (
  <div>
    {
      _.map(tasks, task => <div key={task._id}>{task.title}</div>)
    }
  </div>    
);

export default createQueryContainer(query, TaskList, {
    reactive: true, // defaults to false, will use pub/sub system
    dataProp: 'tasks', // defaults to 'data'
    single: false, // defaults to false, when you expect a single document, like you filter by _id, use this. 
});
```

You can pass params directly in the constructor, these params will be passed to the query.

```js
import TaskList from './Tasks.jsx';

export default () => {
    return <TaskList params={{isActive: true}} anyOtherProp="willBePassedToComponent" />
}
```
