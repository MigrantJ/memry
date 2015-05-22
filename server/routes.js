module.exports.initialize = function(app, dbConnection) {
  'use strict';
  var Def = require('./defs/def_model.js').getModel(dbConnection);
  var User = require('./users/user_model.js').getModel(dbConnection, Def);
  var defDB = require('./defs/def_interface.js').getAPI(Def);
  var userDB = require('./users/user_interface.js').getAPI(User);

  var auth = require('./auth.js');

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
              deflist: user.deflists[req.memry.deflist_id].name,
              defs: defs
            });
          }
        });
      }
    });
  });

  app.post('/api/defs', auth.checkReq, function (req, res) {
    var user_id = req.memry.user_id;
    var deflist_id = req.memry.deflist_id;

    userDB.getUserDeflist(user_id, deflist_id, function (err, list) {
      if (err) {
        console.log(err);
        return res.status(500).json({error: err});
      } else {
        defDB.addNewDef(list, req.body, function (err, newDef) {
          if (err) {
            console.log(err);
            return res.status(500).json(err);
          } else {
            userDB.addDefIDToDeflist(user_id, deflist_id, newDef._id);
            return res.send(newDef);
          }
        });
      }
    });
  });

  app.delete('/api/defs/:defID', auth.checkReq, function (req, res) {
    defDB.removeDef(req.params.defID, function (err) {
      if (err) {
        return res.status(500).json(err);
      } else {
        userDB.removeDefIDFromDeflist(req.memry.user_id, req.memry.deflist_id, req.params.defID);
        return res.sendStatus(200);
      }
    });
  });

  app.put('/api/defs/:defID', auth.checkReq, function (req, res) {
    defDB.editDef(req.params.defID, req.body, function (err, modifiedDef) {
      if (err) {
        return res.status(500).json(err);
      } else {
        return res.send(modifiedDef);
      }
    });
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

  app.post('/api/oauth', function (req, res) {
    var method = req.body.method || '';
    if (method === 'Google') {
      auth.getGoogleToken(req.body.code);
      return res.status(200).json({message: 'yup'});
    } else if (method === 'Facebook') {
      auth.verifyFBToken(req.body.token, function (err, token) {
        if (err) {
          return res.status(401).json(err);
        } else {
          return res.status(200).json({token: token});
        }
      });
    } else {
      return res.status(400).json({message: 'Bad Request'});
    }
  });

  app.get('/oauth2callback', function (req, res) {
    console.log('callback');
    console.log(req.body);
    return res.status(200).json({message: 'received'});
  });

  app.post('/oauth2callback', function (req, res) {
    console.log('callback');
    console.log(req.body);
    return res.status(200).json({message: 'received'});
  });

  /***************
   * Default Routes
   */

  app.get('/', function(req, res) {
    res.sendFile(app.get('root') + '/build/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });
};