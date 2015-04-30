module.exports.initialize = function(app, dbConnection) {
  'use strict';
  var Def = require('./defs/def_model.js').getModel(dbConnection);
  var Deflist = require('./deflists/deflist_model.js').getModel(dbConnection, Def);
  var User = require('./users/user_model.js').getModel(dbConnection, Deflist);
  var db = require('./db_interface.js').getAPI(Def);

  /***************
   * Definition Routes
   */

  app.get('/api/defs/:defID', function (req, res) {
    db.getDefByID(req.params.defID, function (err, returnDef) {
      if (err) {
        return res.status(500).json(err);
      } else {
        return res.send(returnDef);
      }
    });
  });

  app.get('/api/defs', function (req, res) {
    db.getAllDefs(function (err, defs) {
      if (err) {
        return res.status(500).json(err);
      } else {
        return res.send(defs);
      }
    });
  });

  app.post('/api/defs', function (req, res) {
    db.addNewDef(req.body, function (err, newDef) {
      if (err) {
        return res.status(500).json(err);
      } else {
        return res.send(newDef);
      }
    });
  });

  app.delete('/api/defs/:defID', function (req, res) {
    db.removeDef(req.params.defID, function (err) {
      if (err) {
        return res.status(500).json(err);
      } else {
        return res.sendStatus(200);
      }
    });
  });

  app.put('/api/defs/:defID', function (req, res) {
    db.editDef(req.params.defID, req.body, function (err, modifiedDef) {
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

  app.post('/api/users', function (req, res) {
    console.dir(req.body);
    res.sendStatus(200);
  });

  /***************
   * Default Routes
   */

  app.get('/', function(req, res) {
    res.sendFile(app.get('root') + '/build/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });
};