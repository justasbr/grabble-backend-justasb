var fs = require('fs');

var words = fs.readFileSync('grabble.txt').toString().split("\n");
words = words.filter(w => w.length === 7);
words = words.map(w => w.toLowerCase());
var wordSet = new Set(words);

module.exports = wordSet;