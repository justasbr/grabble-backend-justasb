const routes = require('express').Router();

var request = require('request');
var parseString = require('xml2js').parseString;
var _ = require('lodash');
var Bacon = require('baconjs').Bacon;

var includes = require('./utility').includes;
var daysOfWeek = require('./utility').daysOfWeek;

routes.get('/:day?', function(req,res) {
  var inputDay = req.params.day;
  var now = new Date();
  var day = inputDay || dayOfWeek(now);

  if (includes(daysOfWeek, day)) {
    var placemarks = getPlacemarks(day);

    placemarks.onValue(function onValue(result) {
      res.json(result);
    });

    placemarks.onError(function onError() {
      res.status(500).json({message: 'Could not get placemarks.'});
    });
  } else {
    res.status(400).json({message: 'Invalid day.'})
  }
});

function dayOfWeek(date) {
  var offsetToGmt = 60 + date.getTimezoneOffset();
  var offsetInMillis = offsetToGmt * 60 * 1000;

  var now = new Date(date.getTime() + offsetInMillis);
  return daysOfWeek[now.getDay()];
}

function getPlacemarks(dayOfWeek) {
  return fetchPlacemarks(dayOfWeek)
    .flatMap(convertToJson)
    .map('.kml.Placemark')
    .flatMap(Bacon.fromArray)
    .map(tidyPlacemark)
    .scan([], '.concat').last();
}

function fetchPlacemarks(dayOfWeek) {
  var coordinatesUrl = `http://www.inf.ed.ac.uk/teaching/courses/selp/coursework/${dayOfWeek}.kml`;

  return Bacon.fromCallback(function (callback) {
    request.get(coordinatesUrl, function (err, res, body) {
      if (err) {
        callback(new Bacon.Error('Could not fetch placemarks.'))
      } else {
        callback(body);
      }
    })
  })
}

function convertToJson(xml) {
  return Bacon.fromCallback(function (callback) {
    parseString(xml, {trim: true}, function (err, object) {
      if (err) {
        callback(new Bacon.Error('Did not receive valid placemarks XML.'));
      } else {
        callback(object);
      }
    });
  })
}

function tidyPlacemark(placemark) {
  var lngLatHeight = placemark.Point[0].coordinates[0].split(",");
  var lng = lngLatHeight[0];
  var lat = lngLatHeight[1];

  return {
    name: placemark.name[0],
    letter: placemark.description[0],
    lat: lat,
    lng: lng
  }
}

module.exports = routes;