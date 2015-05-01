'use strict';

module.exports.getModel = function (mongoose, Deflist) {
  var schema = mongoose.Schema({
    email: String,
    password: String,
    deflists: [Deflist]
  });

  return mongoose.model('User', schema);
};