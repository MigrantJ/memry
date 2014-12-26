var chai = require('chai');
var expect = chai.expect;

var api = require('../../../server/defAPI');

var testDefs = [{
  _id: 5678,
  title: "test2",
  description: "<b>This is another test definition</b>",
  descriptionURL: "This is another test definition"
},{
  _id: 1234,
  title: "test",
  description: "This is a test definition",
  descriptionURL: "This is a test definition"
}];

describe('Server - Def API', function () {
  describe('# validateInput', function () {
    it('throws an error when definition parts are missing', function () {
      expect(function () {
        api.validateInput(testDefs, {})
      }).to.throw('Definition is corrupt, missing required parts');
    });
    it('throws an error when trying to add a def that already exists', function () {
      expect(function () {
        api.validateInput(testDefs, testDefs[0])
      }).to.throw('Title test2 already exists!');
    });
  });

  describe('# formatInput', function () {
    it('strips out unsafe chars', function () {
      var safeDef = api.formatInput(testDefs[0]);
      expect(safeDef.description).to.equal('&lt;b&gt;This is another test definition&lt;/b&gt; ');
    });
    it('adds a space to the end', function () {
      var safeDef = api.formatInput(testDefs[1]);
      expect(safeDef.description).to.equal('This is a test definition ');
    })
  });
});