var fs = require('fs'),
    path = require('path'),
    url = require('url'),
    async = require('async'),
    _ = require('underscore');

module.exports = {
  middleware: function(root, assets, compilerMap) {
    return function(req, res, next) {
      if (req.method != 'GET' && req.method != 'HEAD') return next();
    
      var ext = path.extname(req.url).slice(1),
          routes = assets[ext];
      function validRoute(route) {
        return req.url.indexOf(route) == 0;
      };
      if (!_.any(routes, validRoute)) return next();

      var complete = false;
      function handle(fullName, handler) {
        fs.exists(fullName, function(exists) {
          if (!exists) return;
          if (complete) throw new Error('asset file conflict:' + fullName);
          complete = true;
          fs.readFile(root + req.url, 'utf8', function(err, data) {
            if (err) {
              throw err;
            }
            handler(data);
          });
        });
      }

      // if the extension doesn't change we simpley send that file
      var files = [ { name: root + req.url, handler: req.end } ];

      // else we compiler and send that
      var compilers = compilerMap[ext];
      if (compilers) {
        var rootFileName = root + req.url.slice(0, -(ext.length));
        var toAdd = _.map(_.keys(compilers), function(ext) {
          return { name: rootFileName + ext, handler: function(data) {
            compilers[key](data, function(err, data) {
              if (err) throw err;
              res.end(data);
            });
          };
        })
        files.push.appy(files, toAdd);
      }

      async.forEach(files, function(file) {
        handler(file.name, file.handler); }); 
      }, function(err) {
        if (err) throw err;
        if (!completed) next();
      });
    };
  }
};
