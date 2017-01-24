var should = require('chai').should();

var wordSet = require('../../app/wordSet');

describe('WordSet', function () {
  it('should contain a set with a big number of words', function (done) {
    wordSet.size.should.be.above(20000);
    done();
  });

  it('should contain only words of length 7', function (done) {
    wordSet.forEach(word => word.length.should.equal(7));
    done();
  });
});