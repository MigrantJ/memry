/*global angular*/

angular.module('jgAccount')
  .factory('jgAccountAccount', function ($http, $location, jgAccountToken) {
    'use strict';
    var api = {};
    //var data = {};

    api.login = function (credentials) {
      return $http.post('/api/login', credentials)
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

    api.createAccount = function (credentials) {
      return $http.post('api/users', credentials)
        .then(function (res) {
          jgAccountToken.setToken(res.token);
        });
    };

    return api;
  })
;
