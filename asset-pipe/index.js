var fs = require('fs'),
    path = require('path'),
    url = require('url'),
    async = require('async'),
    _ = require('underscore');

module.exports = {
  middleware: function(root, assets, compilerMap) {
    compilerMap = _.extend(compilerMap || {}, require('./compilers')(root, assets));
    return function(req, res, next) {
      if (req.method != 'GET' && req.method != 'HEAD') return next();
    
      var ext = path.extname(req.url).slice(1),
          routes = assets[ext];

      // ignore if the file is not in an assets directory
      function validRoute(route) {
        return req.url.indexOf(route) == 0;
      };
      if (!_.any(routes, validRoute)) return next();

      // if the file exists we simply send that
      var files = [ { name: root + req.url, compiler: res.end } ];

      // grab possible compilers for this extension
      var compilers = compilerMap[ext];
      if (compilers) {
        var rootFileName = root + req.url.slice(0, -(ext.length));
        // map possible file names to compilers
        var toAdd = _.map(_.keys(compilers), function(key) {
          return { name: rootFileName + key, compiler: function(data) {
            compilers[key](data, function(err, data) {
              if (err) throw err;
              res.end(data);
            });
          }};
        })
        // add possible files to list
        files.push.apply(files, toAdd);
      }

      // compile each file
      async.forEach(files, function(file) {
        compile(file.name, file.compiler); 
      }, function(err) {
        if (err) throw err;
        if (!completed) next();
      });

      var complete = false;
      function compile(fullName, compiler) {
        fs.exists(fullName, function(exists) {
          if (!exists) return;
          if (complete) throw new Error('asset file conflict:' + fullName);
          complete = true;
          fs.readFile(fullName, 'utf8', function(err, data) {
            if (err) {
              throw err;
            }
            compiler(data);
          });
        });
      }
    };
  }
};
