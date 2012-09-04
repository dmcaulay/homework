var less = require('less'),
    _ = require('underscore');

module.exports = function(root, assets) {
  return {
    css: {
      less: function(body, cb) {
        var parser = new less.Parser({
          paths: _.map(assets.css, function(path) { return root + path; })
        });
        return parser.parse(body, function(e, tree) {
          if (e) {
            cb(e);
            return;
          }
          cb(null, tree.toCSS());
        });
      }
    }
  };
};
