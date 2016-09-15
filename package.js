Package.describe({
  name: 'cultofcoders:grapher-react',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3');
  api.use('ecmascript');
  api.use('react-meteor-data@0.2.9');
  api.imply('react-meteor-data@0.2.9');
  api.use('aldeed:simple-schema@1.5.3');

  api.mainModule('grapher-react.js', 'client');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('grapher-react');
});
