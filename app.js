var flatiron = require('flatiron'),
    union = require('union'),
    ecstatic = require('ecstatic'),
    path = require('path'),
    fs = require('fs'),
    app = flatiron.app;

app.config.file({ file: path.join(__dirname, 'config', 'config.json') });
app.resources = require('./resources');

app.use(flatiron.plugins.http, {}, {
  before: [
    ecstatic(__dirname + '/public')
  ]
});

require('./templates')(app.router);

app.use(require('restful'));

app.start(8000);
