module.exports.initialize = function(app, dbConnection) {
  'use strict';
  var Def = require('./defs/def_model.js').getModel(dbConnection);
  var User = require('./users/user_model.js').getModel(dbConnection, Def);
  var defDB = require('./defs/def_interface.js').getAPI(Def);
  var userDB = require('./users/user_interface.js').getAPI(User);

  var auth = require('./auth.js');

  var getDeflist = function (req, res, callback) {
    userDB.getUserDeflist(req.memry.user_id, req.memry.deflist_id, function (err, defIds) {
      if (err) {
        console.log(err);
        return res.status(500).json({error: err});
      } else {
        defDB.getDefsByIDs(defIds, function (err, deflist) {
          if (err) {
            console.log(err);
            return res.status(500).json({error: err});
          } else {
            callback(deflist);
          }
        });
      }
    });
  };

  /***************
   * Definition Routes
   */

  //todo: remove for prod
  app.get('/api/defs/all', function () {
    defDB.getAllDefs(function (err, defs) {
      console.log('ALL DEFS:');
      console.log(JSON.stringify(defs, null, ' '));
    });
  });

  app.get('/api/defs', auth.checkReq, function (req, res) {
    userDB.getUser(req.memry.user_id, function (err, user) {
      if (err) {
        console.log('Error: ' + err);
        return res.status(500).json({error: err});
      } else {
        var list = user.deflists[req.memry.deflist_id].defs || [];
        defDB.getDefsByIDs(list, function (err, defs) {
          if (err) {
            console.log('MongoDB Error: ' + err);
            return res.status(500).json({error: err});
          } else {
            return res.send({
              username: user.username,
              currentListName: user.deflists[req.memry.deflist_id].name,
              listnames: user.deflists.map(function (e) {
                return e.name;
              }),
              defs: defs
            });
          }
        });
      }
    });
  });

  app.post('/api/defs', auth.checkReq, function (req, res) {
    getDeflist(req, res, function (deflist) {
      defDB.addNewDef(deflist, req.body, function (err, data) {
        if (err) {
          console.log(err);
          return res.status(500).json(err);
        } else {
          userDB.addDefIDToDeflist(req.memry.user_id, req.memry.deflist_id, data.newDef._id, function (err) {
            if (err) {
              console.log(err);
              return res.status(500).json(err);
            } else {
              getDeflist(req, res, function (deflist) {
                return res.send({defs: deflist});
              });
            }
          });
        }
      });
    });
  });

  app.delete('/api/defs/:defID', auth.checkReq, function (req, res) {
    getDeflist(req, res, function (deflist) {
      defDB.removeDef(deflist, req.params.defID, function (err) {
        if (err) {
          return res.status(500).json(err);
        } else {
          userDB.removeDefIDFromDeflist(req.memry.user_id, req.memry.deflist_id, req.params.defID, function (err) {
            if (err) {
              console.log(err);
              return res.status(500).json(err);
            } else {
              getDeflist(req, res, function (deflist) {
                return res.send({defs: deflist});
              });
            }
          });
        }
      });
    });
  });

  app.put('/api/defs/:defID', auth.checkReq, function (req, res) {
    getDeflist(req, res, function (deflist) {
      defDB.editDef(deflist, req.params.defID, req.body, function (err) {
        if (err) {
          console.log(err);
          return res.status(500).json(err);
        } else {
          getDeflist(req, res, function (deflist) {
            return res.send({defs: deflist});
          });
        }
      });
    });
  });

  /***************
   * Token Routes
   */
  app.get('/api/token', auth.checkReq, function (req, res) {
    res.status(200).send();
  });

  app.get('/api/token/:listIndex', auth.checkReq, function (req, res) {
    var token = auth.getToken(req.memry.user_id, req.params.listIndex);
    return res.status(200).json({token: token});
  });

  /***************
   * User Routes
   */

  //todo: DELETE THIS ROUTE IN PROD
  app.get('/api/users/all', function (req, res) {
    userDB.getAllUsers(function (err, users) {
      if (err) {
        return res.status(500).json(err);
      } else {
        console.log('ALL USERS:');
        console.log(JSON.stringify(users, null, ' '));
        return res.send(users);
      }
    });
  });

  app.post('/api/users', function (req, res) {
    userDB.addNewUser(req.body, function (err, user) {
      if (err) {
        return res.status(500).json(err);
      } else {
        var token = auth.getToken(user._id, 0);
        return res.status(200).json({token: token});
      }
    });
  });

  app.post('/api/users/verify', auth.checkCaptcha, function (req, res) {
    userDB.getUserByName(req.body.username, function (err, user) {
      if (user) {
        return res.status(403).json({error: 'Username already taken!'});
      } else {
        console.log('yay');
      }
    });
  });

  /***************
   * Login Routes
   */

  app.post('/api/deflists', userDB.checkLogin, function (req, res) {
    var deflists = [];
    req.user.deflists.forEach(function (e) {
      deflists.push(e.name);
    });
    res.status(200).json({deflists: deflists});
  });

  app.post('/api/login', userDB.checkLogin, function (req, res) {
    var deflistID;
    if (req.body.deflist !== null) {
      deflistID = req.body.deflist;
    } else {
      deflistID = userDB.addDeflist(req.user, req.body.deflistName);
    }
    var token = auth.getToken(req.user._id, deflistID);
    return res.status(200).json({token: token});
  });

  app.post('/api/oauth/deflists', auth.checkOauth, function (req, res) {
    userDB.getUserByName(req.username, function (err, user) {
      var deflists = null;
      if (user) {
        deflists = [];
        user.deflists.forEach(function (e) {
          deflists.push(e.name);
        });
      }
      res.status(200).json({deflists: deflists});
    });
  });

  app.post('/api/oauth/login', auth.checkOauth, function (req, res) {
    userDB.getUserByName(req.username, function (err, user) {
      var deflistID;
      if (req.body.deflist !== null) {
        deflistID = req.body.deflist;
      } else {
        deflistID = userDB.addDeflist(user, req.body.deflistName);
      }
      var token = auth.getToken(user._id, deflistID);
      return res.status(200).json({token: token});
    });
  });

  app.post('/api/oauth/newAccount', auth.checkOauth, function (req, res) {
    userDB.addNewUser({username: req.user_id, password: auth.hashPassword(req.user_id), deflistName: req.body.deflistName}, function (err, user) {
      if (err) {
        return res.status(500).json(err);
      } else {
        var token = auth.getToken(user._id, 0);
        return res.status(200).json({token: token});
      }
    });
  });

  /***************
   * Default Routes
   */

  app.get('/', function(req, res) {
    res.sendFile(app.get('root') + '/build/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });
};