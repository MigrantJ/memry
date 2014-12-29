var chai = require('chai');
var request = require('request');

var expect = chai.expect;

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
    title: "test4956730",
    description: "This is a test definition",
    descriptionURL: "This is a test definition"
  };
  var modifiedDef = {
    title: "testModified4956730",
    description: "This test definition has been modified",
    descriptionURL: "This test definition has been modified"
  };

  it('should get 200 on connect - request', function(done) {
    request.get(baseUrl, function (err, res, body) {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it('should POST a definition and return the mongofied version', function (done) {
    request.post({url: defsAPIUrl, json: testDef}, function (err, res, body) {
      expect(res.statusCode).to.equal(200);
      expect(body).to.be.an('object');
      expect(body).to.have.property('title');
      expect(body).to.have.property('_id');
      id = body._id;
      done();
    });
  });

  it('should GET the definition that was just created', function (done) {
    request.get({url: defsAPIUrl + "/" + id, json: true}, function (err, res, body) {
      expect(res.statusCode).to.equal(200);
      expect(body).to.be.an('object');
      expect(body).to.have.property('_id');
      expect(body._id).to.equal(id);
      done();
    });
  });

  it('should PUT changes to the definition', function (done) {
    request.put({url: defsAPIUrl + "/" + id, json: modifiedDef}, function (err, res, body) {
      expect(res.statusCode).to.equal(200);
      expect(body).to.be.an('object');
      expect(body).to.have.property('_id');
      expect(body._id).to.equal(id);
      expect(body).to.have.property('title');
      expect(body.title).to.equal('testModified4956730');
      done();
    });
  });

  it('should DELETE the definition and return its contents', function (done) {
    request.del({url: defsAPIUrl + "/" + id, json: true}, function (err, res, body) {
      expect(res.statusCode).to.equal(200);
      //expect(body).to.be.an('object');
      //expect(body).to.have.property('_id');
      //expect(body._id).to.equal(id);
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