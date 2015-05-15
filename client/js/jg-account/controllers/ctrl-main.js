/*global angular,FB,auth2*/

angular.module('jgAccount')
  .controller('jgAccount-MainController', function ($scope, $location, $http, jgAccountAccount) {
    'use strict';

    $scope.loginSubmit = function () {
      jgAccountAccount.login($scope.email, $scope.password)
        .then(function () {
          $location.path('/main');
        });
    };

    $scope.loginFacebook = function () {
      var login = function (res) {
        $http.post('/api/oauth', {method: 'Facebook', token: res.authResponse.accessToken})
          .then(function (success) {
            console.log(success);
            //todo: $location.path('/main');
          },
          function (error) {
            console.log(error);
          });
      };

      //second param forces FB actually check status, not use cached response
      FB.getLoginStatus(function (res) {
        if (res.status === 'connected') {
          login(res);
        } else {
          FB.login(function (res) {
            if (res.status === 'connected') {
              login(res);
            }
          }, {scope: 'email', return_scopes: true});
        }
      }, true);
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