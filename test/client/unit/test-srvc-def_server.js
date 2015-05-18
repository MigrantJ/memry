describe('Service - Def Server', function () {
  /*
  var testDef = {
    _id: 1234,
    title: "test",
    description: "This is a test definition",
    descriptionURL: "This is a test definition"
  };

  beforeEach(module('memryMain'));

  //we can mock up fake services like this, to support the service we're actually testing. used in #greet below
  //note this had to be called BEFORE the inject command to work
  beforeEach(module(function ($provide) {
    var visitor = {};
    $provide.value('visitor', visitor);
  }));

  beforeEach(inject(function (_defServer_, _$httpBackend_) {
    defServer = _defServer_;
    //$httpBackend is part of angular-mocks
    $httpBackend = _$httpBackend_;
  }));

  describe('Constructor', function () {
    it('returns an object with methods', function () {
      expect(defServer).to.exist;
      expect(defServer).to.have.property('create');
    });
  });

  describe('# getAll', function () {
    it('gets all definitions from the server', function () {
      $httpBackend.expectGET('/api/defs')
        .respond([testDef, testDef]);

      var succeeded = false;

      defServer.getAll()
        .then(function (response) {
          if (response.data[0].title === 'test') {
            succeeded = true;
          }
        });

      $httpBackend.flush();
      expect(succeeded).to.be.true;
    });
  });

  describe('# getOne', function () {
    it('gets one definition from the server', function () {
      var id = testDef._id;
      $httpBackend.expectGET('/api/defs/' + id)
        .respond(testDef);

      var succeeded = false;

      defServer.getOne(id)
        .then(function (response) {
          if (response.data.title === 'test') {
            succeeded = true;
          }
        });

      $httpBackend.flush();
      expect(succeeded).to.be.true;
    });
  });

  describe('# create', function () {
    it('creates a definition on the server', function () {
      $httpBackend
        .expectPOST('/api/defs', testDef)
        .respond(testDef);

      var succeeded = false;

      defServer.create(testDef)
        .then(function (response) {
          if (response.data.title === 'test') {
            succeeded = true;
          }
        });

      $httpBackend.flush();
      expect(succeeded).to.be.true;
    });
  });

  describe('# update', function () {
    it('updates a definition on the server', function () {
      $httpBackend
        .expectPUT('/api/defs/' + testDef._id, testDef)
        .respond(testDef);

      var succeeded = false;

      defServer.update(testDef)
        .then(function (response) {
          if (response.data.title === 'test') {
            succeeded = true;
          }
        });

      $httpBackend.flush();
      expect(succeeded).to.be.true;
    });
  });

  describe('# delete', function () {
    it('deletes a definition from the server', function () {
      $httpBackend
        .expectDELETE('/api/defs/' + testDef._id)
        .respond(testDef);

      var succeeded = false;

      defServer.delete(testDef._id)
        .then(function (response) {
          if (response.data.title === 'test') {
            succeeded = true;
          }
        });

      $httpBackend.flush();
      expect(succeeded).to.be.true;
    });
  });
  */
});