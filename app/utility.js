var alphabet = require('./alphabet');
var _ = require('lodash');

exports.updateInventory = function updateInventory(oldInventory, letters, updateFunc) {
  var newInventory = {};
  var charMap = createLetterMap(letters);
  _.forEach(alphabet, function (letter) {
    var countInInventory = oldInventory[letter] || 0;
    var countInWord = charMap[letter] || 0;
    newInventory[letter] = updateFunc(countInInventory, countInWord);
  });
  return newInventory;
};

exports.containsLetters = function containsLetters(inventory, word) {
  var wordLetterMap = createLetterMap(word);
  return _.every(wordLetterMap, function (countInWord, letter) {
    var countInInventory = inventory[letter] || 0;
    return countInInventory >= countInWord;
  });
};

function createLetterMap(word) {
  var map = {};
  var letterList = word.split("");
  letterList.map(letter => {
    var currentCount = map[letter] || 0;
    map[letter] = currentCount + 1;
  });
  return map;
};