module.exports.initialize = function(app, dbConnection) {
  'use strict';
  var Def = require('./defs/def_model.js').getModel(dbConnection);
  var Deflist = require('./deflists/deflist_model.js').getModel(dbConnection, Def);
  var User = require('./users/user_model.js').getModel(dbConnection, Deflist);
  var defDB = require('./defs/def_interface.js').getAPI(Def);
  var userDB = require('./users/user_interface.js').getAPI(User);

  var auth = require('./auth.js');

  /***************
   * Definition Routes
   */

  app.get('/api/defs/:defID', auth.checkReq, function (req, res) {
    defDB.getDefByID(req.params.defID, function (err, returnDef) {
      if (err) {
        return res.status(500).json(err);
      } else {
        return res.send(returnDef);
      }
    });
  });

  app.get('/api/defs', auth.checkReq, function (req, res) {
    defDB.getAllDefs(function (err, defs) {
      if (err) {
        return res.status(500).json(err);
      } else {
        return res.send(defs);
      }
    });
  });

  app.post('/api/defs', auth.checkReq, function (req, res) {
    defDB.addNewDef(req.body, function (err, newDef) {
      if (err) {
        return res.status(500).json(err);
      } else {
        return res.send(newDef);
      }
    });
  });

  app.delete('/api/defs/:defID', auth.checkReq, function (req, res) {
    defDB.removeDef(req.params.defID, function (err) {
      if (err) {
        return res.status(500).json(err);
      } else {
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

  app.get('/api/users/:userID', function (req, res) {
    console.log('Tried to get user' + req.params.userID);
    res.sendStatus(200);
  });

  app.get('/api/users', function (req, res) {
    userDB.getAllUsers(function (err, users) {
      if (err) {
        return res.status(500).json(err);
      } else {
        console.log(JSON.stringify(users));
        return res.send(users);
      }
    });
  });

  app.post('/api/users', function (req, res) {
    userDB.addNewUser(req.body, function (err, user) {
      if (err) {
        return res.status(500).json(err);
      } else {
        return res.send(user);
      }
    });
  });

  /***************
   * Login Routes
   */

  app.post('/api/login', function (req, res) {
    userDB.loginUser(req.body.email, req.body.password, function (err, token) {
      if (err) {
        return res.status(401).json(err);
      } else {
        return res.status(200).json({token: token});
      }
    });
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