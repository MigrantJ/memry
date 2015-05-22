/*global angular*/

angular.module('jgAccount')
  .controller('jgAccount-MainController', function ($scope, $location, $http, $timeout, jgAccountAccount, jgAccountOauth) {
    'use strict';

    //tabs create an isolate scope, need these for forms to work properly
    $scope.login = {};
    $scope.signup = {};
    $scope.showLogin = true;
    $scope.deflists = [];
    $scope.creatingNewList = false;
    $scope.createListName = '';
    $scope.isLoggingIn = false;
    $scope.isSigningUp = false;

    $scope.loggingIn = function () {
      return $http.post('/api/deflists', {username: $scope.login.email, password: $scope.login.password})
        .then(function (res) {
          $scope.deflists = res.data.deflists;
          //todo: revenge of the timeout hack, this allows dynamic content to animate properly
          $timeout(function () {
            $scope.isLoggingIn = true;
            $scope.isSigningUp = false;
            $scope.switchViews();
          }, 1);
        });
    };

    $scope.signingUp = function () {
      $scope.isLoggingIn = false;
      $scope.isSigningUp = true;
      $scope.switchViews();
    };

    $scope.formSubmit = function (deflistIndex) {
      var credentials;
      var accountFunc;
      if ($scope.isLoggingIn) {
        credentials = {
          username: $scope.login.email,
          password: $scope.login.password,
          deflist: deflistIndex,
          deflistName: $scope.createListName
        };
        accountFunc = jgAccountAccount.login;
      } else if ($scope.isSigningUp) {
        if ($scope.signup.password === $scope.signup.passwordconf) {
          credentials = {
            username: $scope.signup.email,
            password: $scope.signup.password,
            deflist: deflistIndex,
            deflistName: $scope.createListName
          };
          accountFunc = jgAccountAccount.createAccount;
        } else {
          //todo: an actual error system
          console.log('passwords don\'t match');
          return;
        }
      }
      accountFunc(credentials)
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

    $scope.getAll = function () {
      jgAccountAccount.getAll();
    };

    $scope.switchViews = function () {
      $scope.showLogin = !$scope.showLogin;
    };

    $scope.showCreateList = function () {
      $scope.creatingNewList = !$scope.creatingNewList;
    };
  })
;