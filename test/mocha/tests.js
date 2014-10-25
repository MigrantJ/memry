var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;//

describe('Testing Framework', function(){
  it('should pass a simple test', function() {
    expect(true).to.equal(true);
  });
});

describe('Basic Server Functions', function() {
  var baseUrl = 'http://localhost:8000';

  it('should get 200 on connect', function(done) {
    chai.request(baseUrl)
      .get('/')
      .res(function(res) {
        expect(res).to.have.status(200);
        done();
      });
  });
});