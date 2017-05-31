Package.describe({
  name: 'cultofcoders:grapher-react',
  version: '0.1.0',
  // Brief, one-line summary of the package.
  summary: 'Provides easy to use React Components that are suitable for grapher package.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/cult-of-coders/grapher-react',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Npm.depends({
  'simpl-schema': '0.2.1'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3');

  api.use('ecmascript');
  api.use('react-meteor-data@0.2.9');
  api.imply('react-meteor-data@0.2.9');
  // api.use('aldeed:simple-schema@1.5.3');

  api.mainModule('grapher-react.js', 'client');
});

Package.onTest(function(api) {
});
