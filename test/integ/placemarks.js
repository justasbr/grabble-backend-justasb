process.env.NODE_ENV = 'test';

var chai = require('chai');

var should = chai.should();
var chaiHttp = require('chai-http');
var server = require('../../index');

var daysOfWeek = require('../../app/utility').daysOfWeek;
chai.use(chaiHttp);

describe('Placemarks', function () {
  it('should fetch placemarks of today by default', function (done) {
    var now = new Date();
    var weekOfDay = dayOfWeek(now);

    chai.request(server).get(`/placemarks/${weekOfDay}`).end((err, res1) => {
      chai.request(server).get('/placemarks').end((err, res2) => {
        var placemarksToday = res1.body;
        var placemarksDefault = res2.body;
        placemarksDefault.should.deep.equal(placemarksToday);
        done();
      })
    });
  });

  it('should fetch different placemarks for different days of week', function (done) {
    var dayA = daysOfWeek[0];
    var dayB = daysOfWeek[1];
    chai.request(server).get(`/placemarks/${dayA}`).end((err, resA) => {
      chai.request(server).get(`/placemarks/${dayB}`).end((err, resB) => {
        var placemarksA = resA.body;
        var placemarksB = resB.body;
        placemarksA.should.not.deep.equal(placemarksB);
        done();
      })
    });
  });

  it('should return status code 400 if user inputs invalid day', function (done) {
    chai.request(server).get('/placemarks/randomstuff').end((err, res) => {
      res.should.have.status(400);
      done();
    });
  })
});

function dayOfWeek(date) {
  var offsetToGmt = 60 + date.getTimezoneOffset();
  var offsetInMillis = offsetToGmt * 60 * 1000;

  var now = new Date(date.getTime() + offsetInMillis);
  return daysOfWeek[now.getDay()];
}