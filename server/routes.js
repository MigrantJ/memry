module.exports.initialize = function(app, dbConnection) {
  'use strict';
  var Def = require('./db_model.js').getModel(dbConnection);
  var db = require('./db_interface.js').getAPI(Def);

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

  app.get('/', function(req, res) {
    res.sendFile(app.get('root') + '/build/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });
};