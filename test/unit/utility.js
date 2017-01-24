var should = require('chai').should();

var utility = require('../../app/utility');

var daysOfWeek = utility.daysOfWeek;
var includes = utility.includes;

describe('Utility', function () {
  describe('daysOfWeek', function () {

    it('should contain 7 days', function (done) {
      daysOfWeek.length.should.equal(7);
      done();
    });

    it('should contain days of the week', function (done) {
      daysOfWeek.should.contain('monday');
      daysOfWeek.should.contain('friday');
      done();
    })
  });

  describe('includes', function () {
    it('should return true if element is in array', function (done) {
      includes([3, 4, 9], 4).should.be.true;
      done();
    });

    it('should return false if element is not in array', function (done) {
      includes([3, 4, 9], 7).should.be.false;
      done();
    })
  });
});