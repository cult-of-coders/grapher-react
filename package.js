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

Package.onUse(function(api) {
  api.versionsFrom('1.3');
  api.use('ecmascript');
  api.imply('react-meteor-data');
  api.imply('cultofcoders:grapher');

  api.mainModule('main.client.js', 'client');
  api.mainModule('main.server.js', 'server');
});

Package.onTest(function(api) {
});
