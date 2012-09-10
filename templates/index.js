var fs = require('fs'),
    path = require('path'),
    Stream = require('stream');

function render(file, writable) {
  fs.createReadStream(path.join(__dirname, file)).pipe(writable);
}

module.exports = {
  http: function(router) {
    router.get('/', function() {
      render('layout.html', this.res);
    });
    router.get('/templates/:file', function(file) {
      render(file, this.res);
    });
  },
  stream: function(socket) {
    function getStream(file) {
      var stream = new Stream();
      stream.writable = true;
      stream.write = function(data) {
        socket.emit('templates', {file: file, ev: 'data', payload: data});
        return true;
      };
      stream.end = function() {
        socket.emit('templates', {file: file, ev: 'end'});
      };
      return stream;
    }
    socket.on('templates', function(file) {
      render(file, getStream(file));
    });
  }
};
