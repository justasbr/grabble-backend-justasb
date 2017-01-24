const routes = require('express').Router();

var User = require('./models/user');
var Submission = require('./models/submission');

var _ = require('lodash');
var valueOf = require('./models/letterValues').valueOf;
var wordSet = require('./wordSet');
var placemarks = require('./placemarks');
var nameGenerator = require('./nameGenerator');

var leaderboard = require('./leaderboard');

routes.post('/new_user', function (req, res, next) {
  var id = req.body.id || null;
  var name = req.body.name || null;

  if (!id || !name) {
    res.status(400).json({message: "Did not receive enough information to register a new user."});
    return next();
  }

  User.findOne({'name': name}, function (err, user) {
    if (err) {
      res.status(500).json({message: 'Server error.'});
    } else if (user) {
      if (user.id != id) {
        res.status(400).json({message: 'Username already exists.'});
      } else {
        res.send(user);
      }
    } else {
      User.findOne({'id': id}, function (err, user) {
        if (err) {
          res.status(500).json({message: 'Server error.'});
        } else if (user) {
          user.set('name', name);
        } else {
          user = new User({id: id, name: name});
        }
        user.save();
        res.send(user);
      });
    }
  });
});

routes.get('/random_username', function (req, res) {
  var username = nameGenerator.getFullUsername() || "";
  res.json({name: username});
});

routes.post('/submitword', function (req, res) {
  var userId = req.body.id || "";
  var word = req.body.word || "";
  if (!userId || !word) {
    res.status(400).json({message: 'Did not receive enough information.'});
  } else {
    var validWord = wordSet.has(word.toLowerCase());
    if (validWord) {
      User.findOne({'id': userId}, function (err, user) {
        if (!user) {
          res.status(400).json({message: 'Invalid user id.'});
        } else {
          var score = valueOf(word);

          user.set('totalPoints', user.get('totalPoints') + score);
          var newSubmission = new Submission({name: user.name, score: score});

          user.save();
          newSubmission.save();

          res.send(user);
        }
      })
    } else {
      res.status(400).json({message: 'Invalid word.'});
    }
  }
});

routes.use('/leaderboard', leaderboard);

routes.use('/placemarks', placemarks);

module.exports = routes;
