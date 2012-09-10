
var host = require('./server');

module.exports = function(socket) {
  host(require('./teacher'), socket);
};
