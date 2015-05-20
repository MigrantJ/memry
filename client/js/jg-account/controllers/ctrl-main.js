/*global angular,auth2*/

angular.module('jgAccount')
  .controller('jgAccount-MainController', function ($scope, $location, $http, jgAccountAccount, jgAccountOauth) {
    'use strict';

    //tabs create an isolate scope, need these for forms to work properly
    $scope.login = {};
    $scope.signup = {};

    $scope.loginSubmit = function () {
      jgAccountAccount.login($scope.login.email, $scope.login.password)
        .then(function () {
          $location.path('/main');
        },
        function (err) {
          console.log(err);
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
      //todo: check confirm password
      jgAccountAccount.createAccount($scope.signup.email, $scope.signup.password);
    };

    $scope.getAll = function () {
      jgAccountAccount.getAll();
    };
  })
;