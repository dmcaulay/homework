var assetPipe = require('../../asset-pipe'),
    assert = require('assert'),
    less = require('less'),
    fs = require('fs'),
    path = require('path'),
    should = require('should'),
    Stream = require('stream'),
    root = __dirname,
    assets,
    compilers;

assets = {
  css: [ '/fixtures/assets/css' ],
  js: [ '/fixtures/assets/js' ]
};

compilers = {
  css: {
    less: function(body, cb) {
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
  }
};

describe('asset-pipe', function() {
  it('calls next if its not a get request', function(done) {
    var req = { method: 'POST' };
    assetPipe.middleware()(req, null, function(req, res, next) {
      done();
    });
  });
  it('calls next if the url doesnt match an assets folder', function(done) {
    var req = { url: '/invalid.js', method: 'GET' };
    assetPipe.middleware(root, assets)(req, null, function(req, res, next) {
      done();
    });
  });
  it('responsds with the file if there is no compiler', function(done) {
    fs.readFile(__dirname + '/fixtures/assets/js/normalize.js', 'utf8', function(err, data) {
      should.not.exist(err);
      var req = { url: '/fixtures/assets/js/normalize.js', method: 'GET' };
      var res = new Stream();
      var header = {};
      res.setHeader = function(name, value) { header[name] = value; };
      res.end = function(compiled) {
        compiled.should.equal(data);
        done();
      };
      assetPipe.middleware(root, assets, compilers)(req, res, function(req, res, next) {
        assert(false, 'should handle request');
      });
    });
  });
  it('compiles with the appropriate compiler if it exists', function(done) {
    fs.readFile(__dirname + '/fixtures/builtAssets/css/style-less.css', 'utf8', function(err, data) {
      should.not.exist(err);
      var req = { url: '/fixtures/assets/css/style-less.css', method: 'GET' };
      var res = new Stream();
      var header = {};
      res.setHeader = function(name, value) { header[name] = value; };
      res.end = function(compiled) { // don't really care about performance or flexibility yet
        compiled.should.equal(data);
        done()
      };
      assetPipe.middleware(root, assets, compilers)(req, res, function(req, res, next) {
        assert(false, 'should handle request');
      });
    });
  });
});
