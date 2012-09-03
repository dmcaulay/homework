var fs = require('fs'),
    path = require('path');

module.exports = function(router) {
  function render(file, res) {
    fs.createReadStream(path.join(__dirname, file)).pipe(res);
  }

  router.get('/', function() {
    render('layout.html', this.res);
  });
  router.get('/templates/:file', function(file) {
    render(file, this.res);
  });
};
