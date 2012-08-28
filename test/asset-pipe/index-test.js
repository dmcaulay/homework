var assetPipe = require('../../asset-pipe'),
    less = require('less'),
    fs = require('fs'),
    path = require('path'),
    should = require('should'),
    assets,
    compilers;

assets = {
  css: [ __dirname + '/fixtures/assets/css' ],
  img: [ __dirname + '/fixtures/assets/img' ],
  js: [ __dirname + 'fixtures/assets/js' ]
};

compilers = {
  css: function(body, opts, cb) {
    var parser = new less.Parser({
      paths: assets.css
    });
    return parser.parse(body, function(e, tree) {
      if (e) {
        cb(e);
        return;
      }
      cb(null, tree.toCSS());
    });
  }
};

descripe('asset-pipe', function() {
  it('compiles less', function(done) {
    var pipe = assetPipe(assets, compilers);
    fs.readFile('fixtures/builtAssets/style-less.css', 'utf8', function(err, data) {
    });
  });
});
