require('es6-shim');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
chai.request.addPromises(global.Promise);

describe('Testing Framework', function(){
  it('should pass a simple test', function() {
    expect(true).to.equal(true);
  });
});

describe('REST API', function() {
  var baseUrl = 'http://localhost:8000';

  it('should get 200 on connect', function(done) {
    chai.request(baseUrl)
      .get('/')
      .then(function (res) {
        expect(res).to.have.status(200);
        done();
      }, function (err) {
        throw err;
      });
  });

  it('should read the test route', function (done) {//
    chai.request(baseUrl)
      .get('/test')
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('test');
        done();
      })
  });

  /*
  it('GET - Random Definition', function (done) {
    chai.request(baseUrl)
      .get('/api/defs/random')
      .res(function (res) {
        expect(res).to.have.status(200);
        expect(res.body).to.not.be.empty;
        expect(res.body).to.have.property('title');
        done();
      });
  });

  it('GET - All Definitions', function (done) {
    chai.request(baseUrl)
      .get('/api/defs/all')
      .res(function (res) {
        expect(res).to.have.status(200);
        expect(res.body).to.not.be.empty;
        done();
      });
  });
  */
});