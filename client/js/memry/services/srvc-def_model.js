/*global angular*/

angular.module('memry')
  .factory('defModel', function (defServer) {
    'use strict';
    //public methods
    var api = {};
    //private data
    var data = {};

    data.defs = defServer.getAll();

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

      data.defs.forEach(function (d) {
        var index = d.title.indexOf(titleSubstr);
        //if index is 0, we found a matching title
        if (index === 0) {
          foundTitleID = d._id;
          //end the forEach loop
          return true;
        }
      });

      return foundTitleID;
    };

    return api;
  })
;