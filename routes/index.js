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

function render(res, layout, body) {
  read(layout, function(err, layout) {
    if (err) return error(res, err);
    if (!body) {
      res.writeHead(200, {'Content-Type': mime.lookup('html')});
      return res.end(layout);
    }
    read(body, function(err, body) {
      if (err) return error(res, err);
      res.writeHead(200, {'Content-Type': mime.lookup('html')});
      res.end(Plates.bind(layout, {body: body}));
    });
  });
}

module.exports = function(router) {
  router.get('/', function() {
    render(this.res, 'layout');
  });

  router.get('/login', function() {
    render(this.res, 'layout', 'login');
  });
};
