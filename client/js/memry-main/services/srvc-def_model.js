/*global angular*/

angular.module('memryMain')
  .factory('defModel', function ($q, defServer) {
    'use strict';
    //public methods
    var api = {};
    //public data
    api.data = {};
    //private data. None yet
    //var data = {};
    var observerCallbacks = [];

    //constructor
    function constructor() {
      api.getDefs();
    }

    var notifyObservers = function () {
      angular.forEach(observerCallbacks, function (cb) {
        cb();
      });
    };

    api.registerObserver = function (cb) {
      observerCallbacks.push(cb);
    };

    api.getDefs = function () {
      defServer.getAll().then(
        function (res) {
          api.data.username = res.data.username;
          api.data.currentListName = res.data.currentListName;
          api.data.defs = res.data.defs;
          api.data.listnames = res.data.listnames;
          notifyObservers();
        }
      );
    };

    /*
    # addDefinition
    */
    api.addDefinition = function (title, description) {
      var deferred = $q.defer();
      defServer.create({
        title: title,
        description: description
      })
        .then(function (res) {
          api.data.defs = res.data.defs;
          deferred.resolve(res.data);
          notifyObservers();
        });
      return deferred.promise;
    };

    /*
    # editDefinition
    */
    api.editDefinition = function (definition) {
      defServer.update(definition)
        .then(function (res) {
          api.data.defs = res.data.defs;
          notifyObservers();
        });
    };

    /*
     # deleteDefinition
     */
    api.deleteDefinition = function (id) {
      defServer.delete(id)
        .then(function (res) {
          api.data.defs = res.data.defs;
          notifyObservers();
        });
    };

    /*
    # findIDByTitleSubstr
    returns the id of the first definition whose title begins with the substring.
    relies on the server returning the defs sorted alphabetically by title
    */
    api.findIDByTitleSubstr = function (titleSubstr) {
      //input validation
      if (typeof titleSubstr !== 'string') {
        throw new Error('findIDByTitleSubstr requires string input');
      }
      var foundTitleID = null;
      titleSubstr = titleSubstr.toLowerCase();

      api.data.defs.some(function (d) {
        //if index is 0, we found a matching title, set foundTitleID to its id
        return d.title.toLowerCase().indexOf(titleSubstr) === 0 && (foundTitleID = d._id);
      });

      return foundTitleID;
    };

    /*
    # findIDByClosestTitle
    returns the id of the definition whose title is the next closest match to the substring.
    ex: with defs of [Jane, Jim], titleSubstr "Jerry" would return Jim's id
    relies on the server returning the defs sorted alphabetically by title
     */
    api.findIDByClosestTitle = function (titleSubstr) {
      //input validation
      if (typeof titleSubstr !== 'string') {
        throw new Error('findIDByClosestTitle requires string input');
      }
      var foundTitleID = null;

      if (api.data.defs.length) {
        titleSubstr = titleSubstr.toLowerCase();

        api.data.defs.some(function (d) {
          return d.title.toLowerCase() >= titleSubstr && (foundTitleID = d._id);
        });

        //if we reached the end of the array without finding anything,
        //return the last def id in the array
        if (!foundTitleID) {
          foundTitleID = api.data.defs[api.data.defs.length - 1]._id;
        }
      }

      return foundTitleID;
    };

    /*
    # findDefByTitle
    takes a string representing a possible title of a def
    returns the def, or null if no def is found with that title
    NOTE: CASE SENSITIVE
    */
    api.findDefByTitle = function (title) {
      if (typeof title !== 'string' || title === '') {
        return null;
      }

      var def = null;
      api.data.defs.some(function (d) {
        return d.title === title && (def = d);
      });
      return def;
    };

    constructor();

    return api;
  })
;