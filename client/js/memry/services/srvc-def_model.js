/*global angular*/

angular.module('memry')
  .factory('defModel', function ($q, defServer) {
    'use strict';
    //public methods
    var api = {};
    //public data
    api.data = {};
    //private data. None yet
    //var data = {};

    //constructor
    function constructor() {
      defServer.getAll()
        .then(function (response) {
          api.data.defs = response.data;
        });
    }

    api.getDefs = function () {
      //todo this is doing the same thing as the constructor
      var promise = defServer.getAll();
      promise.then(function (response) {
        api.data.defs = response.data;
      });
      return promise;
    };

    /*
    # addDefinition
    */
    api.addDefinition = function (title, description) {
      defServer.create({
        title: title,
        description: description
      })
        .then(function (response) {
          console.log(response.data);
          api.getDefs();
        });
    };

    /*
    # editDefinition
    */
    api.editDefinition = function (definition) {
      defServer.update(definition)
        .then(function (response) {
          //todo: don't require a server get every time we change the data
          console.log(response.data);
          api.getDefs();
        });
    };

    /*
     # deleteDefinition
     */
    api.deleteDefinition = function (id) {
      defServer.delete(id)
        .then(function (response) {
          //todo: don't require a server get every time we change the data
          console.log(response.data);
          api.getDefs();
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

      api.data.defs.some(function (d) {
        //if index is 0, we found a matching title, set foundTitleID to its id
        return d.title.indexOf(titleSubstr) === 0 && (foundTitleID = d._id);
      });

      return foundTitleID;
    };

    constructor();

    return api;
  })
;