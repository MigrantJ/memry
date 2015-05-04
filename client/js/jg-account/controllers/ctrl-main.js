/*global angular*/

angular.module('jgAccount')
  .controller('jgAccount-MainController', function ($scope, $location, jgAccountAccount) {
    'use strict';

    $scope.loginSubmit = function () {
      jgAccountAccount.login($scope.email, $scope.password)
        .then(function () {
          $location.path('/main');
        });
    };

    $scope.loginFacebook = function () {
      //jgAccountOauth.loginFacebook();
    };

    $scope.createAccountSubmit = function () {
      jgAccountAccount.createAccount($scope.createEmail, $scope.createPassword);
    };

    $scope.getAll = function () {
      jgAccountAccount.getAll();
    };
  })
;