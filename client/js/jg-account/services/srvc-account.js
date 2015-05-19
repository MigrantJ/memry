/*global angular*/

angular.module('jgAccount')
  .factory('jgAccountAccount', function ($http, $resource, $location, jgAccountToken) {
    'use strict';
    var api = {};
    //var data = {};

    var User = $resource('/api/users/:userID');

    api.login = function (username, password) {
      return $http.post('/api/login', {username: username, password: password})
        .success(function (res) {
          jgAccountToken.setToken(res.token);
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
      var users = User.query({userID: 'all'}, function () {
        console.log('Users');
        console.log(users);
      });
    };

    api.createAccount = function (username, password) {
      var user = new User();
      user.username = username;
      user.password = password;
      user.$save();
    };

    return api;
  })
;
