import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { withTracker } from 'meteor/react-meteor-data';

export const UserContext = React.createContext(null);

class UserContextProvider extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    children: PropTypes.node,
  };

  render() {
    return (
      <UserContext.Provider value={this.props.user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export const User = withTracker(props => {
  let user;
  if (Meteor.isServer) {
    if (props.token) {
      user = Meteor.users.findOne(
        {
          'services.resume.loginTokens.hashedToken': Accounts._hashLoginToken(
            props.token
          ),
        },
        { reactive: false }
      );
    }
  } else {
    user = Meteor.user();
  }

  return {
    user,
  };
})(UserContextProvider);

const withUser = function(Component) {
  const C = props => {
    return (
      <UserContext.Consumer>
        {value => {
          return <Component {...props} user={value} />;
        }}
      </UserContext.Consumer>
    );
  };

  C.displayName = `withUser(${Component.displayName || Component.name})`;

  hoistNonReactStatic(C, Component);
  return C;
};
export default withUser;
