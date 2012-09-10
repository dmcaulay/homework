var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports = new Schema({
  name: String,
  description: String,
  assignedDate: {type: Date, defualt: Date.now},
  dueDate: Date
});

