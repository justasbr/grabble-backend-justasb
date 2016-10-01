const routes = require('express').Router();

routes.get('/profile', function (req, res) {
  res.json({})
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