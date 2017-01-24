var should = require('chai').should();

var nameGenerator = require('../../app/nameGenerator');


describe('NameGenerator', function () {
  it('should generate random names that are well-formatted', function (done) {
    var randomName1 = nameGenerator.getFullUsername();
    isWellFormattedName(randomName1).should.be.true;

    var randomName2 = nameGenerator.getFullUsername();
    isWellFormattedName(randomName2).should.be.true;
    done();
  })
});

function isWellFormattedName(name) {
  return name.length >= 3 && name == capitalize(reduceWhitespace(name));
}

function capitalize(s) {
  return s.toLowerCase().replace(/\b./g, function (w) {
    return w.toUpperCase();
  });
}

function reduceWhitespace(s) {
  return s.replace(/ +(?= )/g, '').trim();
}
