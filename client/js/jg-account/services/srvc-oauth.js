/*global angular, FB*/

angular.module('jgAccount')
  .factory('jgAccountOauth', function ($http, $q, jgAccountToken) {
    'use strict';
    var api = {};

    api.loginFacebook = function () {
      var deferred = $q.defer();

      var checkToken = function (token) {
        if (token) {
          $http.post('/api/oauth', {method: 'Facebook', token: token})
            .then(function (success) {
              jgAccountToken.setToken(success.data.token);
              deferred.resolve(success.data);
            },
            function (error) {
              deferred.reject(error.message);
            });
        } else {
          deferred.reject('Facebook did not connect');
        }
      };

      //second param forces FB actually check status, not use cached response
      FB.getLoginStatus(function (res) {
        var token = null;

        if (res.status === 'connected') {
          token = res.authResponse.accessToken;
        } else {
          FB.login(function (res) {
            if (res.status === 'connected') {
              token = res.authResponse.accessToken;
            }
          }, {scope: 'email', return_scopes: true});
        }

        checkToken(token);
      }, true);

      return deferred.promise;
    };

    return api;
  })
;
