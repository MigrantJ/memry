var Def = require('./database.js');

module.exports.initialize = function(app) {
  'use strict';

  app.get('/api/defs/:defID', function (req, res) {
    Def.findOne({'_id':req.params.defID}, function (err, returnDef) {
      if (err) {
        return res.status(500).json(err);
      } else {
        return res.send(returnDef);
      }
    });
  });

  app.get('/api/defs', function (req, res) {
    Def.find().sort('title').exec(function (err, defs) {
      if (err) {
        return res.status(500).json(err);
      } else {
        return res.send(defs);
      }
    });
  });

  app.post('/api/defs', function (req, res) {
    var def = new Def(req.body);
    def.save(function (err, newDef) {
      if (err) {
        return res.status(500).json(err);
      } else {
        return res.send(newDef);
      }
    });
  });

  app.delete('/api/defs/:defID', function (req, res) {
    Def.findOne({'_id':req.params.defID}, function (err, defToRemove) {
      if (err) {
        return res.status(500).json(err);
      }
      Def.remove({'_id': req.params.defID}, function (err) {
        if (err) {
          return res.status(500).json(err);
        } else {
          return res.send(defToRemove);
        }
      });
    });
  });

  app.put('/api/defs/:defID', function (req, res) {
    //check if this is a valid def
    if (typeof req.body === 'object' && req.body.title) {
      var newDef = req.body;
    } else {
      return res.status(500).send(req.body + ' is not a valid definition');
    }
    Def.findOne({'_id':req.params.defID}, function (err, defToModify) {
      if (err) {
        return res.status(500).json(err);
      }
      defToModify.title = newDef.title;
      defToModify.description = newDef.description;
      defToModify.descriptionURL = newDef.descriptionURL;

      defToModify.save(function (err) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.send(defToModify);
      });
    });
  });

  app.get('/', function(req, res) {
    res.sendFile(app.get('root') + '/build/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });
};