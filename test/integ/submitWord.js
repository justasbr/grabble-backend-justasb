process.env.NODE_ENV = 'test';

var chai = require('chai');

var should = chai.should();
var chaiHttp = require('chai-http');
var server = require('../../index');

var nameGen = require('../../app/nameGenerator');

chai.use(chaiHttp);

describe('Word Submitting', function () {
  var userId = nameGen.getRandomId();
  var userName = nameGen.getRandomId();

  var WORD = "LOOKING";
  var INVALID_WORD = "ABCDEFG";
  var SCORE = 70;
  var currentScore;

  it('should allow existing user to submit word', function (done) {

    registerUser(userId, userName, () => {
      submitWord(userId, WORD, (err, res) => {
        res.should.have.status(200);
        res.body.should.contain.keys('totalPoints');
        currentScore = res.body.totalPoints;
        done();
      })
    });
  });

  it('should not allow non-existing user to submit word', function (done) {
    submitWord(nameGen.getRandomId(), WORD, (err, res) => {
      res.should.have.status(400);
      done();
    })
  });

  it('should not allow user with missing information to submit word', function (done) {
    submitWord(null, WORD, (err, res) => {
      res.should.have.status(400);
      done();
    });
  });

  it('should update point count after a valid submission', function (done) {
    submitWord(userId, WORD, (err, res) => {
      var expectedScore = currentScore + SCORE;
      res.body.should.contain.keys('totalPoints');
      res.body.totalPoints.should.equal(expectedScore);
      done();
    });
  });

  it('should return status code 400 if given invalid word', function (done) {
    submitWord(userId, INVALID_WORD, (err, res) => {
      res.should.have.status(400);
      done();
    });
  });
});

function registerUser(id, name, callback) {
  chai.request(server).post('/new_user').send({id: id, name: name}).end(callback);
}

function submitWord(id, word, callback) {
  chai.request(server).post('/submitword').send({id: id, word: word}).end(callback);
}