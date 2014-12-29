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
        defAPI.validateDefToAdd(defs, defBody);
        var formattedDef = defAPI.formatInput(defBody);

        //create the descriptionURL param by adding links to the input description
        formattedDef.descriptionURL = defAPI.addLinksToNewDefDesc(defs, formattedDef);

        var def = new Model(formattedDef);
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
    var defToModify = null;

    api.getDefByID(id, function (err, returnDef) {
      if (err) {
        return callback(err);
      } else {
        defToModify = returnDef;
      }
    });

    defToModify.title = newDef.title;
    defToModify.description = newDef.description;
    defToModify.descriptionURL = newDef.descriptionURL;

    defToModify.save(function (err, def) {
      return callback(err, def);
    });
  };

  return api;
};