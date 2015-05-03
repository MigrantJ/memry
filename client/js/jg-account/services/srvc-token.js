/*global angular*/

angular.module('jgAccount')
  .factory('jgAccountToken', function ($window) {
    'use strict';
    var api = {};

    api.getToken = function () {
      return $window.localStorage.token;
    };

    api.setToken = function (token) {
      $window.localStorage.token = token;
    };

    return api;
  })
;
