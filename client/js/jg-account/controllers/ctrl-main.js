/*global angular,auth2*/

angular.module('jgAccount')
  .controller('jgAccount-MainController', function ($scope, $location, $http, jgAccountAccount, jgAccountOauth) {
    'use strict';

    $scope.loginSubmit = function () {
      jgAccountAccount.login($scope.email, $scope.password)
        .then(function () {
          $location.path('/main');
        });
    };

    $scope.loginFacebook = function () {
      jgAccountOauth.loginFacebook()
        .then(function () {
          $location.path('/main');
        },
        function (error) {
          console.log(error);
        });
    };

    $scope.loginGoogle = function () {
      auth2.grantOfflineAccess({'redirect_uri': 'postmessage'}).then(function (res) {
        if (res['code']) {
          // todo: Hide the sign-in button now that the user is authorized:

          // Send the code to the server
          $http.post('/api/oauth', {method: 'Google', code: res['code']});
        } else {
          // There was an error.
          console.log('error');
        }
      });
    };

    $scope.createAccountSubmit = function () {
      jgAccountAccount.createAccount($scope.createEmail, $scope.createPassword);
    };

    $scope.getAll = function () {
      jgAccountAccount.getAll();
    };
  })
;