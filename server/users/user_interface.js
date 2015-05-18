'use strict';
var auth = require('../auth.js');

module.exports.getAPI = function (Model) {
  var api = {};

  api.loginUser = function (username, password, callback) {
    Model.findOne({username: username, password: password}, function (err, user) {
      if (err) {
        callback("Error occurred: " + err);
      } else {
        if (user) {
          callback(null, auth.getToken(username));
        } else {
          callback("Incorrect login");
        }
      }
    });
  };

  api.getAllUsers = function (callback) {
    Model.find().sort('email').exec(function (err, users) {
      return callback(err, users);
    });
  };

  //todo: don't store these passwords in plaintext
  api.addNewUser = function (reqBody, callback) {
    var user = new Model({username: reqBody.username, password: reqBody.password});

    user.save(function (err) {
      callback(err, user);
    });
  };

  return api;
};//