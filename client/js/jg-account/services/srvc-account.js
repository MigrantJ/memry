/*global angular*/

angular.module('jgAccount')
  .factory('jgAccountAccount', function ($http, $resource) {
    'use strict';
    var api = {};

    var User = $resource('/api/users/:userID');

    api.login = function (email, password) {
      $http.post('/api/login', {email: email, password: password});
    };

    api.getAll = function () {
      var users = User.query(function () {
        console.log('Users');
        console.log(users);
      });
    };

    api.createAccount = function (email, password) {
      var user = new User();
      user.email = email;
      user.password = password;
      user.$save();
    };

    return api;
  })
;
