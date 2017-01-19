var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema for our user model
var submissionSchema = Schema({
  name: {type: String, required: true},
  score: {type: Number, required: true, min: 0},
  submitted_at: {type: Date, required: true, default: Date.now}
});

module.exports = mongoose.model('Submission', submissionSchema);