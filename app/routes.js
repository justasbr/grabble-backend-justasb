const routes = require('express').Router();

var User = require('./models/user');

var _ = require('lodash');
var updateInventory = require('./utility').updateInventory;
var containsLetters = require('./utility').containsLetters;
var valueOf = require('./models/letterValues').valueOf;
var wordSet = require('./wordSet');
var placemarks = require('./placemarks');

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
            var valueOfWord = valueOf(word);
            var newInventory = updateInventory(user.get('inventory'), word, _.subtract);

            user.set('inventory', newInventory);
            user.set('totalWords', user.get('totalWords') + 1);
            user.set('totalPoints', user.get('totalPoints') + valueOfWord);

            if (valueOf(word) > user.get('bestScore')){
              user.set('bestScore', valueOfWord);
              user.set('bestWord', word);
            }

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

routes.get('/leaderboard', function (req, res) {
  User.find({}).sort({totalPoints: -1})
    .limit(5).select('id totalPoints -_id')
    .exec(function (err, leaderboard) {
      if (!err) {
        res.json({leaderboard: leaderboard});
      } else {
        res.status(400).json({err: 'Could not get leaderboard'});
      }
    });
});

routes.use('/placemarks', placemarks);

module.exports = routes;