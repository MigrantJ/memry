/*global angular*/

angular.module('jgAccount')
  .factory('jgAccountAccount', function ($resource) {
    'use strict';
    var api = {};

    var User = $resource('/api/users/:userID');

    api.createAccount = function (email, password) {
      var user = new User();
      user.$save({email: email, password: password});
    };

    return api;
  })
;
