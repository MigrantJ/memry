'use strict';

module.exports.getModel = function (mongoose, Def) {
  var schema = mongoose.Schema({
    name: String,
    defs: [Def]
  });

  return mongoose.model('Deflist', schema);
};