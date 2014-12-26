'use strict';
var _ = require('lodash');
var api = {};

api.test = function () {
  console.log('hi');
};

api.validateInput = function (defs, inputDef) {
  //confirm definition is formatted properly
  if (inputDef.title === undefined || inputDef.description === undefined) {
    throw 'Definition is corrupt, missing required parts';
  }
  //confirm once again that this title doesn't already exist
  if (_.find(defs, function(def) { return inputDef.title === def.title; })) {
    throw 'Title ' + inputDef.title + ' already exists!';
  }
};

api.formatInput = function (inputDef) {
  //make sure input is safe and doesn't have html or mysql injection or anything else weird
  var safeDef = inputDef;
  //strip out / convert all unsafe characters - ', ", html tags, mysql calls, etc and save back into description
  safeDef.description = _.escape(inputDef.description);

  //add a space to the end of the description if there isn't one already, for regex purposes
  if (safeDef.description[safeDef.description.length - 1] !== ' ') {
    safeDef.description += ' ';
  }

  return safeDef;
};

module.exports = api;