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
          callback(null, auth.getToken(user._id, 0));
        } else {
          callback("Incorrect login");
        }
      }
    });
  };

  api.getAllUsers = function (callback) {
    Model.find().sort('username').exec(function (err, users) {
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

  api.getUser = function (user_id, callback) {
    Model.findById(user_id, function (err, user) {
      if (err) {
        callback('Error occurred: ' + err);
      } else {
        if (user) {
          callback(null, user);
        } else {
          callback('User ' + user_id + ' not found!');
        }
      }
    });
  };

  api.getUserDeflist = function (user_id, deflist_id, callback) {
    Model.findById(user_id, function (err, user) {
      if (err) {
        callback('Error occurred: ' + err);
      } else {
        if (user) {
          var list = user.deflists[deflist_id].defs || [];
          callback(null, list);
        } else {
          callback('User ' + user_id + ' not found!');
        }
      }
    });
  };

  api.addDefIDToDeflist = function (user_id, deflist_id, def_id) {
    api.getUser(user_id, function (err, user) {
      user.deflists[deflist_id].defs.push(def_id);
      user.save();
    });
  };

  api.removeDefIDFromDeflist = function (user_id, deflist_id, def_id) {
    api.getUser(user_id, function (err, user) {
      var index = user.deflists[deflist_id].defs.indexOf(def_id);
      user.deflists[deflist_id].defs.splice(index, 1);
    });
  };

  return api;
};//