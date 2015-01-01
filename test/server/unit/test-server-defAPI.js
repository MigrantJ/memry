var chai = require('chai');
var expect = chai.expect;

var api = require('../../../server/defAPI');
var testDefs, newDef;
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
});

describe('Server - Def API', function () {
  describe('# validateDefToAdd', function () {
    it('throws an error when definition parts are missing', function () {
      expect(function () {
        api.validateDefToAdd(testDefs, {})
      }).to.throw('Definition is corrupt, missing required parts');
    });
  });

  describe('# checkIfTitleExists', function () {
    it('throws an error when trying to add a def that already exists', function () {
      expect(function () {
        api.checkIfTitleExists(testDefs, testDefs[0])
      }).to.throw('Title test2 already exists!');
    });
  });

  describe('# formatInput', function () {
    it('strips out unsafe chars', function () {
      var safeDef = api.formatInput(testDefs[0]);
      expect(safeDef.description).to.equal('&lt;b&gt;This description has html tags&lt;/b&gt; ');
    });
    it('adds a space to the end', function () {
      var safeDef = api.formatInput(testDefs[1]);
      expect(safeDef.description).to.equal('This is a test definition ');
    })
  });

  describe('# defTitleToRegexStr', function () {
    var beginning = '(';
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
      expect(modifiedDefs[1].descriptionURL).to.equal(testDefs[1].descriptionURL);
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
  });
});