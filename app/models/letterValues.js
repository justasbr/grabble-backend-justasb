var _ = require('lodash');

var values = {
  'a': 3,
  'b': 20,
  'c': 13,
  'd': 10,
  'e': 1,
  'f': 15,
  'g': 18,
  'h': 9,
  'i': 5,
  'j': 25,
  'k': 22,
  'l': 11,
  'm': 14,
  'n': 6,
  'o': 4,
  'p': 19,
  'q': 24,
  'r': 8,
  's': 7,
  't': 2,
  'u': 12,
  'v': 21,
  'w': 17,
  'x': 23,
  'y': 16,
  'z': 26
};

exports.valueOf = function valueOf(string) {
  var value = 0;
  var letters = string.split('');
  _.forEach(letters, function (letter) {
    value += values[letter];
  });
  return value;
};