require('es6-shim');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
chai.request.addPromises(global.Promise);

var request = require('request');

describe('Testing Framework', function(){
  it('should pass a simple test', function() {
    expect(true).to.equal(true);
  });
});

describe('REST API', function() {
  var baseUrl = 'http://localhost:8000';
  var defsAPIUrl = baseUrl + '/api/defs';
  var id;
  var testDef = {
    title: "test",
    description: "This is a test definition",
    descriptionURL: "This is a test definition"
  };

  it('should get 200 on connect - request', function(done) {
    request.get(baseUrl, function (err, res, body) {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
//
  it('should read the test route - request', function (done) {
    request.get(baseUrl + '/test', function (err, res, body) {
      expect(res).to.have.status(200);
      var jsonBody = JSON.parse(body);
      expect(jsonBody).to.have.property('test');
      done();
    });
  });

  it('should POST a definition and return the mongofied version', function (done) {
    request.post({url: defsAPIUrl, form: testDef}, function (err, res, body) {
      expect(res).to.have.status(200);
      var jsonBody = JSON.parse(body);
      expect(jsonBody).to.have.property('title');
      expect(jsonBody).to.have.property('_id');
      id = jsonBody._id;
      done();
    });
  });

  it('should GET the definition that was just created', function (done) {
    request.get(defsAPIUrl + "/" + id, function (err, res, body) {
      expect(res).to.have.status(200);
      var jsonBody = JSON.parse(body);
      expect(jsonBody).to.have.property('_id');
      expect(jsonBody._id).to.equal(id);
      done();
    })
  });

  it('should DELETE the definition and return its contents', function (done) {
    request.del(defsAPIUrl + "/" + id, function (err, res, body) {
      expect(res).to.have.status(200);
      var jsonBody = JSON.parse(body);
      expect(jsonBody).to.have.property('_id');
      expect(jsonBody._id).to.equal(id);
      done();
    });
  });

  it('should no longer have the definition in the db', function (done) {
    request.get(defsAPIUrl + "/" + id, function (err, res, body) {
      expect(body).to.equal("");
      done();
    });
  });
});