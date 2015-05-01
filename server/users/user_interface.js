'use strict';
//var userAPI = require('./defAPI.js');
var auth = require('../auth.js');

module.exports.getAPI = function (Model) {
  var api = {};

  api.getUser = function (email, password, callback) {
    Model.findOne({email: email, password: password}, function (err, user) {
      if (err) {
        callback("Error occurred: " + err);
      } else {
        if (user) {
          callback(null, user);
        } else {
          callback("Incorrect login");
        }
      }
    });
  };

  api.checkUserToken = function (token, callback) {
    Model.findOne({token: token}, function (err, user) {
      if (err) {
        callback('Error: ' + err);
      } else {
        callback(null, user);
      }
    });
  };

  api.getAllUsers = function (callback) {
    Model.find().sort('email').exec(function (err, users) {
      return callback(err, users);
    });
  };

  api.addNewUser = function (reqBody, callback) {
    var user = new Model({email: reqBody.email, password: reqBody.password});

    user.token = auth.getToken(user);

    user.save(function (err) {
      callback(err, user);
    });
  };

  return api;
};