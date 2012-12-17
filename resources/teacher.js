var mongoose = require('mongoose'),
    // troop = require('mongoose-troop'),
    Schema = mongoose.Schema,
    Class = require('./class');

var Teacher = new Schema({
  email: {
    type: String,
    lowercase: true,
    required: true, 
    index: { unique: true }  
  },
  hash: String,
  classes: [Class]
});
// Teacher.plugin(troop.basicAuth, {loginPath: 'email'});
module.exports = mongoose.model('Teacher', Teacher);

