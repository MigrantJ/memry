'use strict';

module.exports.getModel = function (mongoose) {
  var schema = mongoose.Schema({
    title: String,
    description: String,
    descriptionURL: String
  });

  return mongoose.model('Def', schema);
};