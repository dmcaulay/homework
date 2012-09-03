var resourceful = require('resourceful'),
    Assignment;

module.exports = Assignment = resourceful.define('assignment');

Assignment.string('name');
Assignment.string('description');
Assignment.number('dueDate', { format: "unix-time" });
Assignment.timestamps();
Assignment.restful = true;
