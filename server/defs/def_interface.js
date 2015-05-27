'use strict';
var defAPI = require('./def_API.js');

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
    Model.find().sort('lowercaseTitle').exec(function (err, defs) {
      return callback(err, defs);
    });
  };

  api.getDefsByIDs = function (ids, callback) {
    Model.find({ '_id': { $in: ids } }).sort('lowercaseTitle').exec(function (err, defs) {
      return callback(err, defs);
    });
  };

  //adds a new def to the database
  //returns the newly added def
  //api.addNewDef = function (defBody, callback) {
  api.addNewDef = function (deflist, defBody, callback) {
    if (defAPI.titleExists(deflist, defBody)) {
      return callback({error: 'Title ' + defBody.title + ' already exists!'});
    } else {
      if (!defAPI.defIsValid(deflist, defBody)) {
        return callback({error: 'Definition is corrupt, missing required parts'});
      } else {
        var processedDef = defAPI.processInputDef(deflist, defBody);
        var def = new Model(processedDef);

        def.save(function (err, newDef) {
          deflist = defAPI.addDeflinksToDescriptions(deflist, newDef);
          api.saveAllDefs(deflist, function (err) {
            if (err) {
              return callback(err);
            }
          });
          return callback(err, {newDef: newDef, defs: deflist});
        });
      }
    }
  };

  //removes a def from the db by its id
  //returns errors if present
  api.removeDef = function (defs, id, callback) {
    Model.remove({'_id': id}, function (err) {
      if (err) {
        return callback(err);
      } else {
        defs = defAPI.removeDeflinkFromDescriptions(defs, {'_id': id});
        api.saveAllDefs(defs, function (err) {
          callback(err);
        });
      }
    });
  };

  api.editDef = function (defs, id, newDef, callback) {
    api.getDefByID(id, function (err, defToModify) {
      if (err) {
        return callback(err);
      } else {
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
        defToModify.lowercaseTitle = processedDef.title.toLowerCase();
        defToModify.description = processedDef.description;
        defToModify.descriptionURL = processedDef.descriptionURL;
        defToModify.save(function (err, def) {
          return callback(err, {def: def, defs: defs});
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