describe('Service - Def Model', function () {
  var testDefs = [{
    _id: 5678,
    title: "test2",
    description: "This is another test definition",
    descriptionURL: "This is another test definition"
  },{
    _id: 1234,
    title: "test",
    description: "This is a test definition",
    descriptionURL: "This is a test definition"
  }];

  beforeEach(module('memry'));

  //we can mock up fake services like this, to support the service we're actually testing. used in #greet below
  //note this had to be called BEFORE the inject command to work
  beforeEach(module(function ($provide) {
    var defServer = {
      getAll: function () {
        return testDefs;
      }
    };
    $provide.value('defServer', defServer);
  }));

  beforeEach(inject(function (_defModel_) {
    defModel = _defModel_;
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