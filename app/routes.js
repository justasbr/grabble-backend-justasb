const routes = require('express').Router();

var User = require('./models/user');

var _ = require('lodash');
var containsLetters = require('./utility').containsLetters;
var valueOf = require('./models/letterValues').valueOf;
var wordSet = require('./wordSet');
var placemarks = require('./placemarks');

var leaderboard = require('./leaderboard');

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
          if (containsLetters(user.get('inventory'), word)) {
            user.set('totalPoints', user.get('totalPoints') + valueOf(word));

            user.save();
            res.send(user);
          } else {
            res.status(400).json({err: 'Not enough letters to complete word.'})
          }
        }
      })
    } else {
      res.status(400).json({err: 'Invalid word.'});
    }
  }
});

routes.use('/leaderboard', leaderboard);

routes.use('/placemarks', placemarks);

module.exports = routes;