'use strict';
var auth = require('../auth.js');

module.exports.getAPI = function (Model) {
  var api = {};

  api.checkLogin = function (req, res, next) {
    Model.findOne({username: req.body.username},
      function (err, user) {
        if (err) {
          console.log(err);
          res.status(500).send('Internal server error, please try again!');
        } else {
          if (user && auth.comparePassword(req.body.password, user.password)) {
            req.user = user;
            next();
          } else {
            res.status(401).send('Incorrect credentials, please try again!');
          }
        }
      }
    );
  };

  api.getAllUsers = function (callback) {
    Model.find().sort('username').exec(function (err, users) {
      return callback(err, users);
    });
  };

  api.addNewUser = function (reqBody, callback) {
    var user = new Model({
      username: reqBody.username,
      password: auth.hashPassword(reqBody.password),
      deflists: [{
        name: reqBody.deflistName,
        defs: []
      }]
    });

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

  api.getUserByName = function (username, callback) {
    Model.findOne({username: username}, function (err, user) {
      if (err) {
        callback('Error occurred: ' + err);
      } else {
        if (user) {
          callback(null, user);
        } else {
          callback('User ' + username + ' not found!');
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

  api.addDeflist = function (user, name) {
    var newID = user.deflists.length;
    user.deflists.push({name: name, defs: []});
    user.save();
    return newID;
  };

  api.addDefIDToDeflist = function (user_id, deflist_id, def_id, callback) {
    api.getUser(user_id, function (err, user) {
      user.deflists[deflist_id].defs.push(def_id);
      user.save(function (err) {
        callback(err);
      });
    });
  };

  api.removeDefIDFromDeflist = function (user_id, deflist_id, def_id, callback) {
    api.getUser(user_id, function (err, user) {
      var index = user.deflists[deflist_id].defs.indexOf(def_id);
      user.deflists[deflist_id].defs.splice(index, 1);
      user.save(function (err) {
        callback(err);
      });
    });
  };

  return api;
};//