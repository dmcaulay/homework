
module.exports = function(modelName, socket) {
  var proxy = {};
  var actions = ['create', 'update', 'find', 'findOne', 'findById', 'remove'];
  actions.forEach(function(action) {
    proxy[action] = function(payload, callback) {
      socket.emit(modelName, action, payload, callback);
    };
  });

  // resourceful interface
  proxy.get = proxy.findById;
  proxy.destroy = proxy.remove;
  proxy.all = proxy.find;
  proxy.save = function(payload, callback) {
    if (payload._id) {
      return proxy.update(payload, callback);
    }
    return proxy.create(payload, callback);
  };

  return proxy;
};
