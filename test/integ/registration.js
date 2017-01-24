process.env.NODE_ENV = 'test';

var chai = require('chai');

var should = chai.should();
var chaiHttp = require('chai-http');
var server = require('../../index');

var nameGen = require('../../app/nameGenerator');

chai.use(chaiHttp);

describe('Registration', function () {
  var userId = nameGen.getRandomId();
  var userName = nameGen.getRandomId();

  it('should return details of new user on registration', function (done) {
    registerUser(userId, userName, (err, res) => {
      res.should.have.status(200);
      res.body.id.should.equal(userId);
      res.body.name.should.equal(userName);
      res.body.totalPoints.should.equal(0);
      done();
    });
  });

  it('should not allow to register with an existing username', function (done) {
    var anotherId = nameGen.getRandomId();

    registerUser(anotherId, userName, (err, res) => {
      res.should.have.status(400);
      done();
    });
  });

  it('should change name if old user registers again', function (done) {
    var anotherName = nameGen.getRandomId();

    registerUser(userId, anotherName, (err, res) => {
      res.should.have.status(200);
      res.body.id.should.equal(userId);
      res.body.name.should.equal(anotherName);
      done();
    });
  });

  it('should return status 400 if there is no user id', function (done) {
    registerUser2({name: userName}, (err, res) => {
      res.should.have.status(400);
      done();
    });
  });

  it('should return status 400 if there is no user name', function (done) {
    registerUser2({id: userId}, (err, res) => {
      res.should.have.status(400);
      done();
    });
  })
});

function registerUser(id, name, callback) {
  chai.request(server).post('/new_user').send({id: id, name: name}).end(callback);
}

function registerUser2(body, callback) {
  chai.request(server).post('/new_user').send(body).end(callback);
}