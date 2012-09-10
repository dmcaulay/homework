var flatiron = require('flatiron'),
    union = require('union'),
    ecstatic = require('ecstatic'),
    path = require('path'),
    fs = require('fs'),
    assetCompiler = require('asset-compiler'),
    app = flatiron.app;

app.config.file({ file: path.join(__dirname, 'config', 'config.json') });

app.use(flatiron.plugins.http, {
  before: [
    ecstatic(__dirname + '/public', { autoIndex: false }),
    assetCompiler.middleware(__dirname, {
      css: ['/assets/css', '/vendor/bootstrap/less']
    })
  ]
});

// host templates
var templates = require('./templates');
templates.http(app.router);

app.start(8000);

// socket.io
require('./socket')(app.server, [
  require('./resources'), // host resources
  templates.stream
]);


