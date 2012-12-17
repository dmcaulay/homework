var fs = require('fs');
var path = require('path');
var mime = require('connect').mime;
var Plates = require('plates');

function read(template, cb) {
  fs.readFile(path.join(__dirname, '../templates/' + template + '.html'), 'utf8', cb);
}

function error(res, err) {
  console.log(err);
  res.writeHead(500);
  res.end();
}

function render(layout, body, res) {
  read(layout, function(err, layout) {
    if (err) return error(res, err);
    if (!body) {
      res.writeHead(200, {'Content-Type': mime.lookup('html')});
      res.end(layout);
    }
    read(body, function(err, body) {
      if (err) return error(self.res, err);
      self.res.writeHead(200, {'Content-Type': mime.lookup('html')});
      self.res.end(Plates.bind(layout, {body: body}));
    });
  });
}

module.exports = function(router) {
  router.get('/', function() {
    render(res, 'layout');
  });

  router.get('/login', function() {
    render(res, 'layout', 'login');
  });
};
