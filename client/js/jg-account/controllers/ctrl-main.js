/*global angular*/

angular.module('jgAccount')
  .controller('jgAccount-MainController', function ($scope, $location, $http, $timeout, jgAccountAccount, jgAccountOauth) {
    'use strict';

    //tabs create an isolate scope, need these for forms to work properly
    $scope.login = {};
    $scope.signup = {};
    $scope.credentials = {};
    $scope.accountFunc = null;
    $scope.showLogin = true;
    $scope.deflists = [];
    $scope.creatingNewList = false;
    $scope.createListName = '';

    $scope.loggingIn = function () {
      $scope.credentials.username = $scope.login.email;
      $scope.credentials.password = $scope.login.password;
      $scope.accountFunc = jgAccountAccount.login;

      return $http.post('/api/deflists', $scope.credentials)
        .then(function (res) {
          $scope.deflists = res.data.deflists;
          //this allows dynamic content to animate properly
          $timeout(function () {
            $scope.switchViews();
          }, 100);
        });
    };

    $scope.signingUp = function () {
      if ($scope.signup.password === $scope.signup.passwordconf) {
        $scope.credentials.username = $scope.signup.email;
        $scope.credentials.password = $scope.signup.password;
        $scope.accountFunc = jgAccountAccount.createAccount;
        $scope.switchViews();
      } else {
        //todo: an actual error system
        console.log('passwords don\'t match');
      }
    };

    $scope.formSubmit = function (deflistIndex) {
      $scope.credentials.deflist = deflistIndex;
      $scope.credentials.deflistName = $scope.createListName;

      $scope.accountFunc($scope.credentials)
        .then(function () {
          $location.path('/main');
        },
        function (err) {
          console.log(err);
        });
    };

    $scope.loginFacebook = function () {
      //get the oauth token
        //brings up facebook dialog automatically if needful but delivers token regardless
      jgAccountOauth.getToken(jgAccountOauth.grantors.Facebook).then(
        function (token) {
          $scope.credentials.token = token;
          //make a call to /api/oauth/deflists
          //server side this checks token authenticity, returns deflists
          return $http.post('/api/oauth/deflists', {token: token}).then(
            function (res) {
              if (res.data.deflists) {
                $scope.deflists = res.data.deflists;
                $scope.credentials.url = '/api/oauth/login';
                $scope.accountFunc = jgAccountOauth.callURL;
              } else {
                //this person has never logged in before
                $scope.credentials.url = '/api/oauth/newAccount';
                $scope.accountFunc = jgAccountOauth.callURL;
              }
              $scope.switchViews();
            }
          );
        },
        function (error) {
          console.log(error);
        }
      );
    };

    $scope.switchViews = function () {
      $scope.showLogin = !$scope.showLogin;
    };

    $scope.showCreateList = function () {
      $scope.creatingNewList = !$scope.creatingNewList;
    };
  })
;