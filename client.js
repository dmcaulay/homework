
var io = require('socket.io-client'),
    $ = require('jquery-browserify'),
    _ = require('underscore');

client = io.connect('http://localhost:8000');

var router = require('./routes/client')($('#body'), client);

