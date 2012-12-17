var flatiron = require('flatiron'),
    union = require('union'),
    ecstatic = require('ecstatic'),
    connect = require('connect'),
    connectHelp = require('./lib/connect-help'),
    path = require('path'),
    assetCompiler = require('asset-compiler'),
    app = flatiron.app,
    sessionStore = new connect.session.MemoryStore();

app.config.file({ file: path.join(__dirname, 'config', 'config.json') });

app.use(flatiron.plugins.http, {
  before: [
    connectHelp,
    connect.cookieParser(),
    connect.session({store: sessionStore, secret: 'secret'}),
    ecstatic(__dirname + '/public', { autoIndex: false }),
    assetCompiler.middleware(__dirname, {
      css: ['/assets/css', '/vendor/bootstrap/less']
    })
  ]
});

require('./routes')(app.router);

app.start(8000);

// socket.io
require('./socket')(app.server, sessionStore, [
  require('./resources'), // host resources
  require('./templates') // host templates
]);


