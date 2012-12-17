var fs = require('fs'),
    path = require('path'),
    Stream = require('stream');

function render(template, writable) {
  fs.createReadStream(path.join(__dirname, template + '.html'), {encoding: 'utf8'}).pipe(writable);
}

module.exports = function(socket) {
  function getStream(template) {
    var stream = new Stream();
    stream.writable = true;
    stream.write = function(data) {
      socket.emit('templates:' + template, {ev: 'data', payload: data});
      return true;
    };
    stream.end = function() {
      socket.emit('templates:' + template, {ev: 'end'});
    };
    return stream;
  }
  socket.on('templates', function(template) {
    render(template, getStream(template));
  });
};
