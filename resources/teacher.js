var resourceful = require('resourceful'),
    Teacher;

module.exports = Teacher = resourceful.define('teacher');

Teacher.string('email');
Teacher.string('password');
Teacher.child('class');
Teacher.restful = true;
