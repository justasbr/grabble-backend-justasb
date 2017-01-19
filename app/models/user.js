var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema for our user model
var userSchema = Schema({
  id: {type: String, unique: true, required: true},
  name: {type: String, unique: true, required: true},
  totalPoints: {type: Number, unique: false, default: 0, required: true, min: 0},
});

module.exports = mongoose.model('User', userSchema);