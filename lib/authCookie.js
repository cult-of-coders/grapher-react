import Cookies from 'js-cookie';
import { Meteor } from 'meteor/meteor';

Meteor.startup(function() {
  resetToken();
});

// override Meteor._localStorage methods and resetToken accordingly
var originalSetItem = Meteor._localStorage.setItem;
Meteor._localStorage.setItem = function(key, value) {
  if (key === 'Meteor.loginToken') {
    Meteor.defer(resetToken);
  }
  originalSetItem.call(Meteor._localStorage, key, value);
};

var originalRemoveItem = Meteor._localStorage.removeItem;
Meteor._localStorage.removeItem = function(key) {
  if (key === 'Meteor.loginToken') {
    Meteor.defer(resetToken);
  }
  originalRemoveItem.call(Meteor._localStorage, key);
};

function resetToken() {
  var loginToken = Meteor._localStorage.getItem('Meteor.loginToken');
  var loginTokenExpires = new Date(
    Meteor._localStorage.getItem('Meteor.loginTokenExpires')
  );

  if (loginToken) {
    setToken(loginToken, loginTokenExpires);
  } else {
    Cookies.remove('meteor_login_token');
  }
}

function setToken(loginToken, expires) {
  Cookies.set('meteor_login_token', loginToken, {
    path: '/',
    expires: expires,
  });
}
