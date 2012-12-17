var cookie = require('cookie');
var parseSignedCookie = require('connect').utils.parseSignedCookie;
var Session = require('connect').middleware.session.Session;

module.exports = function(server, store, listeners) {
  var io = require('socket.io').listen(server);
  // set the session info
  io.set('authorization', function (data, accept) {
    if (!data.headers.cookie) 
      return accept('No cookie transmitted.', false);

    var cookies = cookie.parse(data.headers.cookie);
    var rawCookie = cookies['connect.sid'];
    var unsignedCookie = parseSignedCookie(rawCookie, 'secret');

    data.cookie = cookies;
    data.sessionID = unsignedCookie;

    store.load(data.sessionID, function (err, session) {
      if (err || !session) {
          accept(err || 'No session', false);
      } else {
          data.session = new Session(data, session);
          accept(null, true);
      }
    });
  });
  // handle connections
  io.sockets.on('connection', function(socket) {
    var session = socket.handshake.session;
    listeners.forEach(function(listener) {
      listener(socket);
      // update the session when we receive data
      // socket.on(listener.channel, function(data) {
      //   session.reload(function() {
      //     session.touch().save();
      //   });
      // });
    });
  });
};
