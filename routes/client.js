var Stream = require('stream');
var _ = require('underscore');
window.Router = require('director').browser.Router;
_.extend(Router.prototype, require('director').Router.prototype);

function getSockStream(socket, template) {
  var stream = new Stream();
  function streamEmit(data) {
    stream.emit(data.ev, data.payload);
  }
  var channel = 'templates:' + template;
  socket.on(channel, streamEmit);
  stream.on('end', function() {
    socket.removeListener(channel, streamEmit);
  });
  return stream;
}

module.exports = function($root, socket) {

  var routes = {
    '/classes': classes,
    '/classes/new': newClass,
    '/classes/:id': showClass,
    '/classes/:classId/new': newAssignment,
    '/classes/:classId/:assignmentId': showAssignment
  };

  function get(template, cb) {
    var stream = getSockStream(socket, template);
    var result = '';
    stream.on('data', function(chunk) {
      result += chunk;
    });
    stream.on('end', function() {
      cb(null, result);
    });
    socket.emit('templates', template);
  }

  function classes() {
    get('classes/index', function(err, data) {
      $root.html(data);
    });
  }

  function newClass() {
    get('classes/new', function(err, data) {
      $root.html(data);
    });
  }

  function showClass(id) {
    get('classes/show', function(err, data) {
      $root.html(data);
    });
  }

  function newAssignment(classId) {
    get('assignments/new', function(err, data) {
      $root.html(data);
    });
  }

  function showAssignment(classId, assignmentId) {
    get('assignments/show', function(err, data) {
      $root.html(data);
    });
  }

  var router = new window.Router(routes);
  router.init();

  return router;
};
