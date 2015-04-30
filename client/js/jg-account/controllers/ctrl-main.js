/*global angular*/

angular.module('jgAccount')
  .controller('jgAccount-MainController', function ($scope, $location, jgAccountOauth) {
    'use strict';

    console.log(jgAccountOauth);

    $scope.loginSubmit = function () {
      $location.path('/main');
    };

    $scope.loginFacebook = function () {
      jgAccountOauth.loginFacebook();
    };
  })
;