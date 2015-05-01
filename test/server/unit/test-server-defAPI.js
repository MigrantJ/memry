var chai = require('chai');
var expect = chai.expect;

var api = require('../../../server/defs/def_API');
var testDefs, newDef, shortTitleDef, beginAndEndDef;
beforeEach(function () {
  testDefs = [{
    _id: 5678,
    title: "test2",
    description: "<b>This description has html tags</b>",
    descriptionURL: "&lt;b&gt;This description has html tags&lt;/b&gt;"
  }, {
    _id: 1234,
    title: "test",
    description: "This is a test definition",
    descriptionURL: "This is a test definition"
  }];
  
  newDef = {
    _id: 1111,
    title: "html",
    description: "This test is for adding a new definition",
    descriptionURL: "This test is for adding a new definition"
  };

  shortTitleDef = {
    _id: 666,
    title: "t",
    description: "This tests proper substring regex matching",
    descriptionURL: "This test is for adding a new definition"
  };

  beginAndEndDef = {
    _id: 842,
    title: "Test At Begin And End",
    description: "test whether regex properly replaces words at the begin and end test",
    descriptionURL: "test whether regex properly replaces words at the begin and end test"
  };
});

describe('Server - Def API', function () {
  describe('# defIsValid', function () {
    it('returns true when def has title and description', function () {
      expect(api.defIsValid(testDefs, newDef)).to.equal(true);
    });
    it('returns false if def has no title or description', function () {
      expect(api.defIsValid(testDefs, {})).to.equal(false);
    });
    it('returns false if def has empty string title', function () {
      expect(api.defIsValid(testDefs, {title: '', description: ''})).to.equal(false);
    });
  });

  describe('# titleExists', function () {
    it('returns true when trying to add a def that already exists', function () {
      expect(api.titleExists(testDefs, testDefs[0])).to.equal(true);
    });
    it('returns false if the def does not exist', function () {
      expect(api.titleExists(testDefs, newDef)).to.equal(false);
    });
  });

  describe('# formatInput', function () {
    it('strips out unsafe chars', function () {
      var safeDef = api.formatInput(testDefs[0]);
      expect(safeDef.description).to.equal('&lt;b&gt;This description has html tags&lt;/b&gt;');
    });
  });

  describe('# defTitleToRegexStr', function () {
    var beginning = '([\\s,.;\'"!?])(';
    var ending = ')(?=[\\s,.;\'"!?])';
    it('converts spaces', function () {
      var regex = api.defTitleToRegexStr(' ');
      expect(regex).to.equal(beginning + '\\s' + ending);
    });
    it('handles both upper and lower case versions of the title', function () {
      var regex = api.defTitleToRegexStr('AbCd');
      expect(regex).to.equal(beginning + '[Aa][Bb][Cc][Dd]' + ending);
    });
  });

  describe('# addDeflinksToDescriptions', function () {
    it('adds a link to all definition descriptions based on passed def', function () {
      var modifiedDefs = api.addDeflinksToDescriptions(testDefs, newDef);
      expect(modifiedDefs[0].descriptionURL).to.equal('&lt;b&gt;This description has <deflink d=\'1111\'>html</deflink> tags&lt;/b&gt;');
      expect(modifiedDefs[1].descriptionURL).to.equal("This is a test definition");
    });
    it('only adds links to substrings between spaces or punctuation', function () {
      var modifiedDefs = api.addDeflinksToDescriptions(testDefs, shortTitleDef);
      expect(modifiedDefs[0].descriptionURL).to.equal("&lt;b&gt;This description has html tags&lt;/b&gt;");
      expect(modifiedDefs[1].descriptionURL).to.equal("This is a test definition");
    });
  });

  describe('# removeDeflinkFromDescriptions', function () {
    it('removes a link from all definitions', function () {
      var origDescURL = testDefs[0].descriptionURL;
      testDefs[0].descriptionURL = '&lt;b&gt;This description has <deflink d=\'1111\'>html</deflink> tags&lt;/b&gt;';
      var modifiedDefs = api.removeDeflinkFromDescriptions(testDefs, newDef);
      expect(modifiedDefs[0].descriptionURL).to.equal(origDescURL);
    });
  });

  describe('# addLinksToNewDefDesc', function () {
    it('formats all words that are titles of other defs into links', function () {
      var descriptionURL = api.addLinksToNewDefDesc(testDefs, newDef);
      expect(descriptionURL).to.equal('This <deflink d=\'1234\'>test</deflink> is for adding a new definition');
    });
    it('leaves original description unchanged', function () {
      var descriptionURL = api.addLinksToNewDefDesc(testDefs, newDef);
      expect(newDef.description).to.equal('This test is for adding a new definition');
    });
    it('replaces words at the beginning and ending of descriptions', function () {
      var descriptionURL = api.addLinksToNewDefDesc(testDefs, beginAndEndDef);
      expect(descriptionURL).to.equal('<deflink d=\'1234\'>test</deflink> whether regex properly replaces words at the begin and end <deflink d=\'1234\'>test</deflink>');
    });
  });
});