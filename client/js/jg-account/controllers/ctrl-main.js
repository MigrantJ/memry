/*global angular*/

angular.module('jgAccount')
  .controller('jgAccount-MainController', function ($scope, $location, $http, $timeout, jgAccountAccount, jgAccountOauth) {
    'use strict';

    //tabs create an isolate scope, need these for forms to work properly
    $scope.login = {};
    $scope.signup = {};
    $scope.showLogin = true;
    $scope.deflists = ['No deflists found'];

    $scope.getDeflists = function () {
      return $http.post('/api/deflists', {username: $scope.login.email, password: $scope.login.password})
        .then(function (res) {
          $scope.deflists = res.data.deflists;
          //todo: revenge of the timeout hack, this allows dynamic content to animate properly
          $timeout(function () {
            $scope.test();
          }, 1);
        });
    };

    $scope.loginSubmit = function (deflistIndex) {
      var credentials = {
        username: $scope.login.email,
        password: $scope.login.password,
        deflist: deflistIndex
      };
      jgAccountAccount.login(credentials)
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