var resourceful = require('resourceful'),
    Class;

module.exports = Class = resourceful.define('class');

Class.string('name');
Class.string('description');
Class.child('assignment');
Class.restful = true;
