## Grapher React Components

Using the [cultofcoders:grapher](https://github.com/cult-of-coders/grapher) query component in React.

### Installation

```bash
meteor add cultofcoders:grapher-react
```

### Signature

```js
withQuery(() => query, options)(Component);
```

The first function needs to return a valid `Query` or `NamedQuery` from Grapher.

```js
// This is a query
const query = createQuery({
    users: {
        emails: 1,
    },
});

// This is a named query
const query = createQuery('usersWithEmails', {
    users: {
        emails: 1,
    },
});
```

### Options

<table>
  <tr>
    <th>Property</th>
    <th>Valid values</th>
    <th>Default value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>reactive</td>
    <td>true/false</td>
    <td>`false`</td>
    <td>
        Makes your query reactive (subscribes to changes) or non-reactive, falls back to method calls.
    </td>
  </tr>
  <tr>
    <td>dataProp</td>
    <td>string</td>
    <td>`'data'`</td>
    <td>
        How to properly inject data in your component, like `users` or `posts`
    </td>
  </tr>
  <tr>
    <td>errorComponent</td>
    <td>React.Component (optional)</td>
    <td>`null`</td>  
    <td>Receives `error` object as a prop. Is rendered when subscription or method call triggered an exception</td>
  </tr>
  <tr>
    <td>loadingComponent</td>
    <td>React.Component (optional)</td>
    <td>`null`</td>
    <td>Renders when the data is waiting to be loaded from the server</td>
  </tr>
  <tr>
    <td>single</td>
    <td>true/false</td>
    <td>`false`</td>
    <td>If your query is for a single result, then using `true` will send data as an object instead of an array</td>
  </tr>
  <tr>
    <td>pollingMs</td>
    <td>Number</td>
    <td>`undefined`</td>
    <td>
        Only works for non-reactive queries, it constantly polls for new data every `pollingMs` miliseconds.
    </td>
  </tr>
  <tr>
    <td>loadOnRefetch</td>
    <td>true/false</td>
    <td>`true`</td>
    <td>
        For static (`reactive = false`) queries only, sets `isLoading` to true every time you call refetch until the data is loaded. Set this to false to only get `isLoading` on the initial fetch.
    </td>
  </tr>
      <tr>
    <td>shouldRefetch</td>
    <td>(currentProps, nextProps) => Boolean</td>
    <td>`undefined`</td>
    <td>
        For static queries only, provides a hook into `componentWillReceiveProps` to determine whether the query should be refetched or not. The function will be called with nextProps and currentProps as arguments.
    </td>
  </tr>
</table>

### Simple Usage

```jsx harmony
import React from 'react';
import { withQuery } from 'meteor/cultofcoders:grapher-react';

const PostList = ({ data, isLoading, error }) => {
    if (isLoading) {
        return <div>Loading</div>;
    }

    if (error) {
        return <div>{error.reason}</div>;
    }

    return (
        <div>
            {data.map(post => (
                <li key={post._id}>{post.title}</li>
            ))}
        </div>
    );
};

export default withQuery(props => {
    return getPostLists.clone();
})(PostList);
```

### Props Received

Below are the properties received by the component we wrap, in the example above, that's `PostList`

<table>
  <tr>
    <th>Property</th>
    <th>Valid values</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>isLoading</td>
    <td>true/false</td>
    <td>
        Lets your component know whether the data is waiting to be loaded.
    </td>
  </tr>
  <tr>
    <td>error</td>
    <td>Meteor.Error</td>
    <td>Represents the error triggered from your method or publication. If no error it will be a falsy value.</td>
  </tr>
  <tr>
    <td>refetch</td>
    <td>Function</td>
    <td>For non-reactive queries it passes a refetch function for convenience to help you easily reload the data.</td>
  </tr>
  <tr>
    <td>query</td>
    <td>Query/NamedQuery</td>
    <td>For your convenience, if you ever need the query for any reason, it's passed in there so you can access it.</td>
  </tr>
  <tr>
    <td>...props</td>
    <td>Object</td>
    <td>The props you passed inside withQuery, are passed down to the component it wraps</td>
  </tr>
</table>

### Let's react!

The first example uses the query non-reactively (because that is the default). But let's say you want your query to be reactive (react to changes in the database)

```jsx harmony
// ...
export default withQuery(
    props => {
        return getPostLists.clone();
    },
    { reactive: true },
)(PostList);
```

As mentioned above, the props received are passed down to the component we wrap, meaning:

```jsx harmony
const PostList = ({ data, something }) => {
    return <div>Something is true!</div>;
};

const Container = withQuery(
    props => {
        return getPostLists.clone();
    },
    { reactive: true },
)(PostList);

export default function() {
    return <Container something={true} />;
}
```

The query object is also passed down as a prop, so, if you ever need it you can access it from there.

For a non-reactive query, we also pass `refetch` function as prop, which simply refetches the query from the database,
and updates the components properly:

```jsx harmony
import React from 'react';
import { withQuery } from 'meteor/cultofcoders:grapher-react';

const PostList = ({ data, isLoading, error, refetch }) => {
    return (
        <div>
            <a onClick={refetch}>Reload the data</a>
            {/* Rest of the component */}
        </div>
    );
};

export default withQuery(
    props => {
        return getPostLists.clone();
    },
    { reactive: false },
)(PostList);
```

If you container wraps a single object, and not a list of objects, you can configure your query like this:

```jsx harmony
const UserProfile = ({ data, isLoading, error }) => {
    return <div>{data.email}</div>;
};

export default withQuery(
    props => {
        return getUserProfile.clone({ userId: props.userId });
    },
    {
        single: true,
    },
)(UserProfile);
```

You will find yourself repeating the same code over and over again for when the query is loading or it has an error. For this you can do:

```jsx harmony
function ErrorComponent({ error }) {
    return <div>{error.reason}</div>;
}

function LoadingComponent() {
    return <div>Please wait...</div>;
}

const UserProfile = ({ data }) => {
    return <div>{data.email}</div>;
};

export default withQuery(
    props => {
        return getUserProfile.clone({ userId: props.userId });
    },
    {
        single: true,
        errorComponent: ErrorComponent,
        loadingComponent: LoadingComponent,
    },
)(UserProfile);
```

The `UserProfile` component will not render if it's loading or it errored.

To make things even more simple, you can globally define these rules, and all the components by default will have those options.

```jsx harmony
import { setDefaults } from 'meteor/cultofcoders:grapher-react';

setDefaults({
    reactive: false, // you can default it to true
    single: false, // doesn't make sense to default this to true
    errorComponent: ErrorComponent,
    loadingComponent: LoadingComponent,
});
```

You can override the defaults at the `withQuery` level, for example you want different `error` and `loading` components, you can simply do:

```jsx harmony
export default withQuery(
    props => {
        return getUserProfile.clone({ userId: props.userId });
    },
    {
        errorComponent: null,
        loadingComponent: AnotherLoadingComponent,
    },
)(UserProfile);
```
