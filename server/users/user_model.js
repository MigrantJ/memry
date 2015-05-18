'use strict';

module.exports.getModel = function (mongoose, Def) {
  /*
  var schema = mongoose.Schema({
    email: String,
    password: String,
    deflists: [Deflist]
  });
  */

  var schema = mongoose.Schema({
    username: String,
    password: String,
    deflists: [{
      name: String,
      defs: [Def]
    }]
  });

  return mongoose.model('User', schema);
};