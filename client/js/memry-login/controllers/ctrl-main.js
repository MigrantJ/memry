/*global angular, grecaptcha*/

angular.module('memryLogin')
  .controller('MemryLoginController', function ($scope, $location, $http, $timeout, jgAccountAccount, jgAccountOauth) {
    'use strict';

    //tabs create an isolate scope, need these for forms to work properly
    $scope.credentials = {};
    $scope.accountFunc = null;
    $scope.showLogin = true;
    $scope.deflists = [];
    $scope.creatingNewList = false;
    $scope.createListName = '';
    $scope.createButtonDisabled = true;

    $scope.loggingIn = function (form) {
      $scope.loginError = null;
      $scope.credentials.username = form.email.$viewValue;
      $scope.credentials.password = form.pw.$viewValue;
      $scope.accountFunc = jgAccountAccount.login;

      return $http.post('/api/deflists', $scope.credentials)
        .success(function (res) {
          $scope.deflists = res.data.deflists;
          //this allows dynamic content to animate properly
          $timeout(function () {
            $scope.switchViews();
          }, 100);
        })
        .error(function (err) {
          if (err) {
            $scope.loginError = err;
          } else {
            $scope.loginError = 'Internal server error, please try again later';
          }
        });
    };

    $scope.signingUp = function (form) {
      if (form.pw.$viewValue === form.pwconf.$viewValue) {
        $scope.credentials.username = form.email.$viewValue;
        $scope.credentials.password = form.pw.$viewValue;
        $scope.credentials.captcha = grecaptcha.getResponse();
        $scope.accountFunc = jgAccountAccount.createAccount;
        $http.post('/api/users/verify', $scope.credentials)
          .success(function () {
            $scope.switchViews();
            grecaptcha.reset();
          })
          .error(function (err) {
            console.log(err);
            grecaptcha.reset();
          });
      } else {
        //todo: an actual error system
        grecaptcha.reset();
        console.log('passwords don\'t match');
      }
    };

    $scope.formSubmit = function (deflistIndex) {
      $scope.credentials.deflist = deflistIndex;
      $scope.credentials.deflistName = $scope.createListName.trim();

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
            },
            function (error) {
              console.log(error);
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

    $scope.createListNameChange = function () {
      $scope.createButtonDisabled = $scope.deflists.some(function (e) {
        return $scope.createListName.trim() === e || $scope.createListName.trim() === '';
      });
    };
  })
;
