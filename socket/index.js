
module.exports = function(server, listeners) {
  var io = require('socket.io').listen(server);
  io.sockets.on('connection', function(socket) {
    listeners.forEach(function(listener) {
      listener(socket);
    });
  });
};
