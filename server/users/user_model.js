'use strict';

module.exports.getModel = function (mongoose, Def) {
  var schema = mongoose.Schema({
    username: String,
    password: String,
    deflists: [{
      name: String,
      defs: [String]
    }]
  });

  return mongoose.model('User', schema);
};