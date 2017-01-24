process.env.NODE_ENV = 'test';

var chai = require('chai');

var should = chai.should();
var chaiHttp = require('chai-http');
var server = require('../../index');

var nameGen = require('../../app/nameGenerator');

chai.use(chaiHttp);

describe('Registration', function () {
  it('should return details of new user on registration', function (done) {

    done();
  });

  it('should not allow to register with an existing username', function (done) {

    done();
  });

  it('should change name if old user registers again', function (done) {

    done();
  });

  it('should return status 400 if there is no user id', function (done) {

    done();
  });

  it('should return status 400 if there is no user name', function (done) {

    done();
  })
});

function registerUser(id, name, callback) {
  chai.request(server).post('/new_user').send({id: id, name: name}).end(callback);
}