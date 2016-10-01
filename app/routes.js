const routes = require('express').Router();

var User = require('./models/user');

var _ = require('lodash');
var updateInventory = require('./utility').updateInventory;
var containsLetters = require('./utility').containsLetters;
var wordSet = require('./wordSet');

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

routes.get('/inventory', function (req, res) {
  var userId = req.query.id || null;
  if (!userId) {
    res.status(400).json({err: 'User ID not specified'});
  } else {
    User.findOne({'id': userId}, function (err, user) {
      if (!user) {
        res.status(400).send({err: 'Could not get user.'})
      } else {
        res.json({inventory: user.inventory});
      }
    });
  }
});

routes.post('/grabletter', function (req, res) {
  var userId = req.body.id;
  var letter = (req.body.letter || '').toLowerCase();
  if (!userId || !letter) {
    res.status(400).json({err: 'Did not receive enough information.'});
  } else {
    var validLetter = /^[a-z]$/.test(letter);
    if (validLetter) {
      User.findOne({'id': userId}, function (err, user) {
        if (!user) {
          res.status(400).json({err: 'Invalid user id.'});
        } else {
          var newInventory = updateInventory(user.inventory, letter, _.add);
          user.set('inventory', newInventory);
          user.save();
          res.send(user);
        }
      })
    } else {
      res.status(400).json({err: 'Invalid letter.'});
    }
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
          if (containsLetters(user.inventory, word)) {
            var newInventory = updateInventory(user.inventory, word, _.subtract);
            user.set('inventory', newInventory);
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
  res.json({})
});

routes.get('/placemarks', function (req, res) {
  res.json({})
});

module.exports = routes;