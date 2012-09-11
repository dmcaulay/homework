var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Class = require('./class');

var Teacher = new Schema({
  email: String,
  password: String,
  classes: [Class]
});
module.exports = mongoose.model('Teacher', Teacher);

