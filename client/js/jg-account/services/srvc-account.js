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
    api.checkToken = function () {
      return $http.get('/api/token');
    };

    api.logoff = function () {
      jgAccountToken.destroyToken();
      $location.path('/login');
    };

    api.createAccount = function (credentials) {
      return $http.post('api/users', credentials)
        .success(function (res) {
          jgAccountToken.setToken(res.token);
        });
    };

    return api;
  })
;
