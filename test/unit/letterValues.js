var should = require('chai').should();

var valueOf = require('../../app/models/letterValues').valueOf;

describe('LetterValues', function () {
  it('should correct calculate scores of words', function (done) {
    var word = "buzzwig";
    var expected_score = 124;
    valueOf(word).should.equal(expected_score);

    var word2 = "algebra";
    var expected_score2 = 64;
    valueOf(word2).should.equal(expected_score2);
    done();
  });

  it('should be case insensitive', function (done) {
    var word = "alGeBrA";

    valueOf(word).should.equal(valueOf(word.toUpperCase()));
    done();
  });

  it('should return 0 for empty string', function (done) {
    valueOf("").should.equal(0);
    done();
  });

  it('should return 0 for null', function (done) {
    valueOf(null).should.equal(0);
    done();
  })
});