'use strict';

module.exports.getModel = function (mongoose, Deflist) {
  var schema = mongoose.Schema({
    username: String,
    password: String,
    deflists: [Deflist]
  });

  return mongoose.model('User', schema);
};