describe('Service - Def Model', function () {
  var scope, defModel, defServer = {};
  beforeEach(function () {
    var testDefs = [{
      _id: 1234,
      title: "test",
      description: "This is a test definition",
      descriptionURL: "This is a test definition"
    },{
      _id: 5678,
      title: "test2",
      description: "This is another test definition",
      descriptionURL: "This is another test definition"
    }];

    module('memry', function ($provide) {
      $provide.value('defServer', defServer);
    });

    inject(function ($q) {
      defServer.getAll = function () {
        var deferred = $q.defer();
        deferred.resolve({data: testDefs});
        return deferred.promise;
      };
    });
  });

  beforeEach(inject(function (_defServer_, _defModel_, $rootScope) {
    //this scope var can be passed to controllers being tested
    scope = $rootScope.$new();
    defServer = _defServer_;
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
    })
  });
});