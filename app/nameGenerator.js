var fs = require('fs');

function fetchRows(file) {
  return fs.readFileSync(file).toString().split("\n").map(w => w.trim())
}

var names = fetchRows('./data/names.txt');
var adjectives = fetchRows('./data/adjectives.txt');

var Generator = {};

Generator._getName = function () {
  return pickRandom(names);
};

Generator._getAdjective = function () {
  return pickRandom(adjectives);
};

Generator.getFullUsername = function () {
  var username = this._getAdjective() + ' ' + this._getName();
  return capitalize(reduceWhitespace(username));
};

function pickRandom(arr) {
  if (arr && arr.length > 0) {
    return arr[Math.floor(Math.random() * arr.length)];
  } else {
    return null;
  }
}

function capitalize(s) {
  return s.toLowerCase().replace(/\b./g, function (w) {
    return w.toUpperCase();
  });
}

function reduceWhitespace(s) {
  return s.replace(/ +(?= )/g, '').trim();
}

module.exports = Generator;