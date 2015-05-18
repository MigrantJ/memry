'use strict';

module.exports.getModel = function (mongoose, Deflist) {
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
      defs: [{
        title: String,
        lowercaseTitle: String,
        description: String,
        descriptionURL: String
      }]
    }]
  });

  return mongoose.model('User', schema);
};