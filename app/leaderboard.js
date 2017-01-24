const routes = require('express').Router();

var User = require('./models/user');
var Submission = require('./models/submission');

var _ = require('lodash');

//Current day leaderboard
routes.get('/today', function (req, res) {
  var today = new Date();
  var startOfToday = today.setHours(0, 0, 0, 0);
  var endOfToday = today.setHours(23, 59, 59, 999);

  Submission.find({
    submitted_at: {
      $gte: startOfToday,
      $lte: endOfToday
    }
  }).select('name score -_id').exec(
    function (err, submissions) {
      if (!err) {
        var topScores = _(submissions)
          .groupBy('name')
          .map((subms, name) => ({
            name: name,
            totalPoints: _.sumBy(subms, 'score')
          }))
          .orderBy('totalPoints', 'desc');

        res.json({leaderboard: topScores});
      } else {
        res.status(400).json({message: 'Could not get leaderboard.'});
      }
    })
});

//All-time leaderboard
routes.get('/', function (req, res) {
  User.find({}).sort({totalPoints: -1})
    .select('name totalPoints -_id')
    .exec(function (err, leaderboard) {
      if (!err) {
        res.json({leaderboard: leaderboard});
      } else {
        res.status(400).json({message: 'Could not get leaderboard.'});
      }
    });
});

module.exports = routes;