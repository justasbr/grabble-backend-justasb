var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var defaultInventory = require('./inventory');

// define the schema for our user model
var userSchema = Schema({
  id: {type: String, unique: true, required: true},
  inventory: {type: Object, unique: false, default: defaultInventory, required: true},
  totalPoints: {type: Number, unique: false, default: 0, required: true, min: 0},
  totalWords: {type: Number, unique: false, default: 0, required: true, min: 0},
  bestWord: String,
  bestScore: {type: Number, unique: false, default: 0, required: true, min: 0}
});

module.exports = mongoose.model('User', userSchema);