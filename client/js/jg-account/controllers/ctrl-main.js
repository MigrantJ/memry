/*global angular*/

angular.module('jgAccount')
  .controller('jgAccount-MainController', function ($scope, $location, jgAccountAccount) {
    'use strict';

    $scope.loginSubmit = function () {
      jgAccountAccount.login();
    };

    $scope.loginFacebook = function () {
      //jgAccountOauth.loginFacebook();
    };

    $scope.createAccountSubmit = function () {
      jgAccountAccount.createAccount($scope.email, $scope.password);
    };

    $scope.getAll = function () {
      jgAccountAccount.getAll();
    };
  })
;