'use strict';
//var userAPI = require('./defAPI.js');

module.exports.getAPI = function (Model) {
  var api = {};

  api.getAllUsers = function (callback) {
    Model.find().sort('email').exec(function (err, users) {
      return callback(err, users);
    });
  };

  api.addNewUser = function (reqBody, callback) {
    var user = new Model({email: reqBody.email, password: reqBody.password});

    user.save(function (err) {
      callback(err, user);
    });
  };

  return api;
};