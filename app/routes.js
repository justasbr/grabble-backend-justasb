const routes = require('express').Router();

var User = require('./models/user');
var Submission = require('./models/submission');

var _ = require('lodash');
var containsLetters = require('./utility').containsLetters;
var valueOf = require('./models/letterValues').valueOf;
var wordSet = require('./wordSet');
var placemarks = require('./placemarks');

var leaderboard = require('./leaderboard');

routes.post('/new_user', function (req, res) {
  var userId = req.body.id;
  var userName = req.body.name;

  var user = new User({id: userId, name: userName});
  user.save();
  res.send(user);
});

routes.get('/random_name', function (req, res) {
  res.status(500).json({});
});

routes.get('/profile', function (req, res) {
  var userId = req.query.id || null;
  if (!userId) {
    res.status(400).json({err: 'User ID not specified'});
  } else {
    User.findOne({'id': userId}, function (err, user) {
      if (!user) {
        user = new User({id: userId});
        user.save();
      }
      res.send(user);
    });
  }
});

routes.post('/submitword', function (req, res) {
  var userId = req.body.id;
  var word = req.body.word;
  if (!userId || !word) {
    res.status(400).json({err: 'Did not receive enough information.'});
  } else {
    var validWord = wordSet.has(word);
    if (validWord) {
      User.findOne({'id': userId}, function (err, user) {
        if (!user) {
          res.status(400).json({err: 'Invalid user id.'});
        } else {
          //Valid user and valid word
          // if (containsLetters(user.get('inventory'), word)) {
          var score = valueOf(word);

          user.set('totalPoints', user.get('totalPoints') + score);

          var newSubmission = new Submission({name: user.name, score: score});

          user.save();
          newSubmission.save();

          res.send(user);
        }
      })


    } else {
      res.status(400).json({err: 'Invalid word.'});
    }
  }
});

routes.get('/submissions', function (req, res) {
  Submission.find({}).exec(
    function (err, submissions) {
      if (!err) {
        res.json({submissions: submissions});
      } else {
        res.status(400).json({err: err});
      }
    })
});

routes.use('/leaderboard', leaderboard);

routes.use('/placemarks', placemarks);

module.exports = routes;