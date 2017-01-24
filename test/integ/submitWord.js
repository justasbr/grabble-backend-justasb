process.env.NODE_ENV = 'test';

var chai = require('chai');

var should = chai.should();
var chaiHttp = require('chai-http');
var server = require('../../index');

var nameGen = require('../../app/nameGenerator');

chai.use(chaiHttp);

describe('Word Submitting', function () {
  it('should allow existing user to submit word', function (done) {

    done();
  });

  it('should not allow non-existing user to submit word', function (done) {

    done();
  });

  it('should not allow user with missing information to submit word', function (done) {

    done();
  });

  it('should update point count after a valid submission', function (done) {

    done();
  });

  it('should return status code 400 if given invalid word', function (done) {

    done();
  });
});