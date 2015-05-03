/*global angular*/

//needs to be pushed onto the main module's $httpProvider.interceptors array
//in the config routes block
angular.module('jgAccount')
  .factory('jgAccountTokenInterceptor', function ($q, jgAccountToken) {
    'use strict';
    return {
      request: function(config) {
        config.headers = config.headers || {};
        var token = jgAccountToken.getToken();
        if (token) {
          //config.headers['X-Access-Token'] = $window.sessionStorage.token;
          //config.headers['X-Key'] = $window.sessionStorage.user;
          config.headers['Authorization'] = 'Bearer ' + token;
          config.headers['Content-Type'] = 'application/json';
        }
        return config || $q.when(config);
      },

      response: function(response) {
        return response || $q.when(response);
      }
    };
  })
;
