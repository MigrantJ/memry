/*global angular*/

//needs to be pushed onto the main module's $httpProvider.interceptors array
//in the config routes block
angular.module('jgAccount')
  .factory('jgAccountTokenInterceptor', function ($q, $location, jgAccountToken) {
    'use strict';
    return {
      request: function(req) {
        req.headers = req.headers || {};
        var token = jgAccountToken.getToken();
        if (token) {
          req.headers['Authorization'] = 'Bearer ' + token;
          req.headers['Content-Type'] = 'application/json';
        }
        return req || $q.when(req);
      },

      response: function(res) {
        return res || $q.when(res);
      },

      responseError: function (err) {
        if (err.status === 401) {
          $location.path('/login');
          return err;
        }
      }
    };
  })
;
