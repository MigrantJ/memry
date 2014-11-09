var Def = require('./database.js');

module.exports.initialize = function(app) {
  'use strict';

  app.get('/test', function(req, res) {
    res.json({test: 'hi'});
  });

  app.get('/api/defs/:def_id', function (req, res) {
    Def.findOne({'_id':req.params.def_id}, function (err, returnDef) {
      if (err) {
        return res.status(500).json(err);
      } else {
        return res.send(returnDef);
      }
    });
  });

  app.post('/api/defs', function (req, res) {
    var def = new Def(req.body);
    def.save(function (err, newDef) {
      if (err)
        return res.status(500).json(err);
      else
        return res.send(newDef);
    });
  });

  app.delete('/api/defs/:def_id', function (req, res) {
    Def.findOne({'_id':req.params.def_id}, function (err, defToRemove) {
      if (err) {
        return res.status(500).json(err);
      }
      Def.remove({'_id': req.params.def_id}, function (err) {
        if (err) {
          return res.status(500).json(err);
        } else {
          return res.send(defToRemove);
        }
      });
    });
  });

  app.get('/', function(req, res) {
    res.sendFile(app.get('root') + '/build/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });
};