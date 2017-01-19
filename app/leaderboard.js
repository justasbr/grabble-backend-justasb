const routes = require('express').Router();

var User = require('./models/user');

//Current day leaderboard
routes.get('/today', function (req, res) {
  User.find({}).sort({totalPoints: -1})
    .limit(10).select('id totalPoints -_id')
    .exec(function (err, leaderboard) {
      if (!err) {
        res.json({leaderboard: leaderboard});
      } else {
        res.status(400).json({err: 'Could not get leaderboard'});
      }
    });
});

//All-time leaderboard
routes.get('/', function (req, res) {
  User.find({}).sort({totalPoints: -1})
    .limit(10).select('id totalPoints -_id')
    .exec(function (err, leaderboard) {
      if (!err) {
        res.json({leaderboard: leaderboard});
      } else {
        res.status(400).json({err: 'Could not get leaderboard'});
      }
    });
});

module.exports = routes;