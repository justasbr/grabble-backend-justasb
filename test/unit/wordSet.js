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

  it('should contain a valid word', function (done) {
    wordSet.has("student").should.be.true;
    done();
  });

  it('should not contain an valid word', function (done) {
    wordSet.has("abcde").should.be.false;
    done();
  });

  it('should not contain null', function (done) {
    wordSet.has(null).should.be.false;
    done();
  });
});