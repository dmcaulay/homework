var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Assignment = require('./assignment');

module.exports = new Schema({
  name: String,
  description: String,
  assignments: [Assignment];
});

