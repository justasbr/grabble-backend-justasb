var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/grabletter', function (req, res) {
    res.json({});
});

app.post('/submitword', function (req, res) {
    res.json({});
});

app.get('/inventory', function (req, res) {
    res.json({})
});

app.get('/leaderboard', function (req, res) {
    res.json({})
});

app.get('/profile', function (req, res) {
    res.json({})
});

app.get('/placemarks', function(req,res) {
    res.json({})
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Listening on ' + port);
});