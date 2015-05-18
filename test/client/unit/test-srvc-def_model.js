describe('Service - Def Model', function () {
  var scope, defModel, defServer = {};
  var jgAccountAccount = {};
  var testDefs;
  beforeEach(function () {
    testDefs = [{
      _id: 1111,
      title: "example",
      description: "This is an example definition",
      descriptionURL: "This is an example definition"
    },{
      _id: 1234,
      title: "test",
      description: "This is a test definition",
      descriptionURL: "This is a test definition"
    },{
      _id: 5678,
      title: "test2",
      description: "This is another test definition",
      descriptionURL: "This is another test definition"
    },{
      _id: 6789,
      title: "Test3",
      description: "Testing case sensitivity",
      descriptionURL: "Testing case sensitivity"
    },{
      _id: 9999,
      title: "very last def",
      description: "This is the last definition",
      descriptionURL: "This is the last definition"
    }];

    module('memryMain', function ($provide) {
      $provide.value('defServer', defServer);
      $provide.value('jgAccountAccount', jgAccountAccount);
    });

    inject(function ($q) {
      defServer.getAll = function () {
        var deferred = $q.defer();
        deferred.resolve({data: {defs: testDefs}});
        return deferred.promise;
      };

      jgAccountAccount.getUserName = function () {
        return 'jimgrant@gmail.com';
      };
    });
  });

  beforeEach(inject(function (_defServer_, _defModel_, _jgAccountAccount_, $rootScope) {
    //this scope var can be passed to controllers being tested
    scope = $rootScope.$new();
    defServer = _defServer_;
    jgAccountAccount = _jgAccountAccount_;
    defModel = _defModel_;
    //causes the promises to resolve. In production code this happens automatically
    scope.$digest();
  }));

  describe('Constructor', function () {
    it('returns an object', function () {
      expect(defModel).to.exist;
    });
  });

  describe('# findIDByTitleSubstr', function () {
    it('throws an error with non-string input', function () {
      expect(function(){defModel.findIDByTitleSubstr(0)}).to.throw('findIDByTitleSubstr requires string input');
      expect(function(){defModel.findIDByTitleSubstr()}).to.throw('findIDByTitleSubstr requires string input');
    });
    it('finds the first def that matches the substring and returns its id', function () {
      var id = defModel.findIDByTitleSubstr('t');
      expect(id).to.equal(1234);

      id = defModel.findIDByTitleSubstr('test2');
      expect(id).to.equal(5678);
    });
    it('returns null if it cannot find a def', function () {
      var id = defModel.findIDByTitleSubstr('ridiculousSubstring');
      expect(id).to.not.exist;
    });
    it('is case insensitive', function () {
      var id = defModel.findIDByTitleSubstr('test3');
      expect(id).to.equal(6789);
    });
  });

  describe('# findIDByClosestTitle', function () {
    it('throws an error with non-string input', function () {
      expect(function(){defModel.findIDByTitleSubstr(0)}).to.throw('findIDByTitleSubstr requires string input');
      expect(function(){defModel.findIDByTitleSubstr()}).to.throw('findIDByTitleSubstr requires string input');
    });
    it('finds the def after the substring and returns its id', function () {
      var id = defModel.findIDByClosestTitle('f');
      expect(id).to.equal(1234);

      id = defModel.findIDByClosestTitle('test2a');
      expect(id).to.equal(6789);
    });
    it('returns last def if the substring would occur after the last def', function () {
      var id = defModel.findIDByClosestTitle('z');
      expect(id).to.equal(9999);
    });
    it('is case insensitive', function () {
      var id = defModel.findIDByClosestTitle('test3');
      expect(id).to.equal(6789);
    });
  });

  describe('# findDefByTitle', function () {
    it('returns null if given a blank string or non-string input', function () {
      expect(defModel.findDefByTitle(0)).to.be.null;
      expect(defModel.findDefByTitle('')).to.be.null;
    });
    it('returns a def if one is found with the supplied title', function () {
      var def = defModel.findDefByTitle(testDefs[0].title);
      expect(def).to.equal(testDefs[0]);
    });
    it('returns null if it cannot find a def with that title', function () {
      var def = defModel.findDefByTitle('qwef234g134qdvqerbewr');
      expect(def).to.be.null;
    });
    it('is case sensitive', function () {
      var def = defModel.findDefByTitle('test3');
      expect(def).to.be.null;
    });
  });
});