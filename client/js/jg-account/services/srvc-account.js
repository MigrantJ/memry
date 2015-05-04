/*global angular*/

angular.module('jgAccount')
  .factory('jgAccountAccount', function ($http, $resource, $location, jgAccountToken) {
    'use strict';
    var api = {};

    var User = $resource('/api/users/:userID');

    api.login = function (email, password) {
      return $http.post('/api/login', {email: email, password: password}).success(function (data) {
        jgAccountToken.setToken(data.token);
      });
    };

    //used in main module's route interceptor, in the .run block
    api.isLoggedIn = function () {
      return jgAccountToken.getToken();
    };

    api.logoff = function () {
      jgAccountToken.destroyToken();
      $location.path('/login');
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
