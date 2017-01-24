process.env.NODE_ENV = 'test';

var chai = require('chai');

var should = chai.should();
var chaiHttp = require('chai-http');
var server = require('../../index');

var nameGen = require('../../app/nameGenerator');

chai.use(chaiHttp);

describe('Leaderboard', function () {

  var userId = nameGen.getRandomId();
  var userName = nameGen.getRandomId();

  it('should return a valid leaderboard array for all-time', function (done) {
    chai.request(server)
      .get('/leaderboard')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.contain.keys('leaderboard');
        res.body.leaderboard.should.be.an('array');
        done();
      });
  });

  it('should return a valid leaderboard array for today', function (done) {
    chai.request(server)
      .get('/leaderboard/today')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.contain.keys('leaderboard');
        res.body.leaderboard.should.be.an('array');
        done();
      });
  });


  it('should contain a new user in all-time leaderboard', function (done) {
    registerUser(userId, userName, () => {
      chai.request(server).get('/leaderboard')
        .end((err, res) => {
          var leaderboard = res.body.leaderboard;
          leaderboard.forEach(function (entry) {
            if (entry.name == userName) {
              done();
            }
          })
        })
    })
  });

  it('should update all-time leaderboard with correct score after a word submission', function (done) {
    var WORD = "Buzzwig";
    var EXPECTED_SCORE = 124;

    chai.request(server).post('/submitword').send({id: userId, word: WORD})
      .end(() => {
        chai.request(server).get('/leaderboard')
          .end((err, res) => {
            var leaderboard = res.body.leaderboard;
            leaderboard.forEach(function (entry) {
              if (entry.name == userName) {
                entry.totalPoints.should.equal(EXPECTED_SCORE);
                done();
              }
            })
          })
      })
  });


  it('should update leaderboard of today with correct score after a word submission', function (done) {
    var WORD = "StuDenT";
    var WORD_SCORE = 40;

    var currentScore = 0;

    chai.request(server).get('/leaderboard/today').end((err, res) => {
      var leaderboard = res.body.leaderboard;
      leaderboard.forEach(entry => {
        if (entry.name == userName) {
          currentScore = parseInt(entry.totalPoints);
        }
      });

      chai.request(server).post('/submitword').send({id: userId, word: WORD}).end(() => {
        chai.request(server).get('/leaderboard/today').end((err, res) => {
          var leaderboard = res.body.leaderboard;
          leaderboard.forEach(function (entry) {
            if (entry.name == userName) {
              entry.totalPoints.should.equal(currentScore + WORD_SCORE);
              done();
            }
          })
        })
      })
    });
  });
});

function registerUser(id, name, callback) {
  chai.request(server).post('/new_user').send({id: id, name: name}).end(callback);
}