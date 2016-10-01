const routes = require('express').Router();

var User = require('./models/user');

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
  res.json({})
});

routes.post('/grabletter', function (req, res) {
  res.json({})
});

routes.post('/submitword', function (req, res) {
  res.json({})
});

routes.get('/leaderboard', function (req, res) {
  res.json({})
});

routes.get('/placemarks', function (req, res) {
  res.json({})
});

module.exports = routes;