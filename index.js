var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var routes = require('./app/routes');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/test');

if (process.env.NODE_ENV != 'test') {
  app.use(morgan('dev')); // log every request to the console
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', routes);

var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Listening on ' + port);
});

module.exports = app;