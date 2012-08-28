var flatiron = require('flatiron'),
    union = require('union'),
    ecstatic = require('ecstatic'),
    path = require('path'),
    app = flatiron.app;

app.config.file({ file: path.join(__dirname, 'config', 'config.json') });

app.use(flatiron.plugins.http, {
  before: [
    ecstatic(__dirname + '/public')
  ]
});

app.router.get('/', function () {
  this.res.json({ 'hello': 'world' })
});

app.start(3000);
