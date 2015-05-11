'use strict';
//var userAPI = require('./defAPI.js');
var auth = require('../auth.js');

module.exports.getAPI = function (Model) {
  var api = {};

  api.loginUser = function (email, password, callback) {
    Model.findOne({email: email, password: password}, function (err, user) {
      if (err) {
        callback("Error occurred: " + err);
      } else {
        if (user) {
          callback(null, auth.getToken());
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
    var user = new Model({email: reqBody.email, password: reqBody.password});

    user.save(function (err) {
      callback(err, user);
    });
  };

  return api;
};//