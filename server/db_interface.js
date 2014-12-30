'use strict';
var defAPI = require('./defAPI.js');

module.exports.getAPI = function (Model) {
  var api = {};

  //todo: should mongo ids be used like this?
  //finds a single def by its mongo id
  //returns that def
  api.getDefByID = function (id, callback) {
    Model.findOne({'_id':id}, function (err, returnDef) {
      return callback(err, returnDef);
    });
  };

  //finds all defs from the db and sorts them alphabetically by title
  //returns json obj of all defs
  api.getAllDefs = function (callback) {
    Model.find().sort('title').exec(function (err, defs) {
      return callback(err, defs);
    });
  };

  //adds a new def to the database
  //returns the newly added def
  api.addNewDef = function (defBody, callback) {
    api.getAllDefs(function (err, defs) {
      if (err) {
        return callback(err);
      } else {
        defAPI.checkIfTitleExists(defs, defBody);
        var processedDef = defAPI.processInputDef(defs, defBody);
        var def = new Model(processedDef);

        def.save(function (err, newDef) {
          defs = defAPI.addDeflinksToDescriptions(defs, newDef);
          defs.forEach(function (d) {
            Model.update({_id: d._id}, {title: d.title, description: d.description, descriptionURL: d.descriptionURL}, function (err) {
              if (err) {
                return callback(err);
              }
            });
          });
          return callback(err, newDef);
        });
      }
    });
  };

  //removes a def from the db by its id
  //returns errors if present
  api.removeDef = function (id, callback) {
    Model.remove({'_id': id}, function (err) {
      return callback(err);
    });
  };

  api.editDef = function (id, newDef, callback) {
    api.getDefByID(id, function (err, defToModify) {
      if (err) {
        return callback(err);
      } else {
        //get all the other defs so we can validate the new one
        api.getAllDefs(function (err, defs) {
          var processedDef = defAPI.processInputDef(defs, newDef);

          //if the title has been modified, all the links need to be updated
          if (defToModify.title !== processedDef.title) {
            defs = defAPI.removeDeflinkFromDescriptions(defs, defToModify);
            defs = defAPI.addDeflinksToDescriptions(defs, processedDef);
            api.saveAllDefs(defs, function (err) {
              if (err) {
                return callback(err);
              }
            });
          }

          defToModify.title = processedDef.title;
          defToModify.description = processedDef.description;
          defToModify.descriptionURL = processedDef.descriptionURL;

          defToModify.save(function (err, def) {
            return callback(err, def);
          });
        });
      }
    });
  };

  api.saveAllDefs = function (defs, callback) {
    defs.forEach(function(d) {
      d.save(function (err) {
        if (err) {
          return callback(err);
        }
      });
    });
    return callback();
  };

  return api;
};