Package.describe({
    name: 'cultofcoders:grapher-react',
    version: '0.1.0',
    // Brief, one-line summary of the package.
    summary: 'Provides HOCs for easily wrapping components with Grapher queries',
    // URL to the Git repository containing the source code for this package.
    git: 'https://github.com/cult-of-coders/grapher-react',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.3');
    api.use([
        'ecmascript',
        'tracker',
        'reactive-var',
        'react-meteor-data@0.2.15',
        'cultofcoders:grapher@1.2.8_1',
        'tmeasday:check-npm-versions@0.2.0',
    ]);

    api.imply();

    api.mainModule('main.client.js', 'client');
    api.mainModule('main.server.js', 'server');
});

Package.onTest(function (api) {
    api.use([
        'cultofcoders:grapher-react',
        'cultofcoders:grapher',
        'ecmascript',
        'mongo'
    ]);

    api.use([
        'coffeescript@1.12.7_3',
        'practicalmeteor:mocha@2.4.5_6',
        'practicalmeteor:chai'
    ]);

    api.addFiles('__tests__/main.server.js', 'server');
    api.addFiles('__tests__/main.client.js', 'client');
});
