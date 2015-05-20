/*global angular,auth2*/

angular.module('jgAccount')
  .controller('jgAccount-MainController', function ($scope, $location, $http, jgAccountAccount, jgAccountOauth) {
    'use strict';

    //tabs create an isolate scope, need these for forms to work properly
    $scope.login = {};
    $scope.signup = {};
    $scope.showLogin = true;

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

    $scope.createAccountSubmit = function () {
      //todo: check confirm password
      jgAccountAccount.createAccount($scope.signup.email, $scope.signup.password);
    };

    $scope.getAll = function () {
      jgAccountAccount.getAll();
    };

    $scope.test = function () {
      $scope.showLogin = !$scope.showLogin;
    };
  })
;