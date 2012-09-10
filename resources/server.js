
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/homework-dev');
mongoose.connection.on('open', function(err) {
  console.log('open:', err);
});

module.exports = function(Model, socket) {
  socket.on(Model.modelName, function (action, payload, callback) {
    if (typeof Model[action] === 'function') {
      return Model[action](payload, callback); 
    }
    return callback(new Error(action + ' is not a valid action'));
  });
};

