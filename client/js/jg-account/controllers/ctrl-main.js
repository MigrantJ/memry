/*global angular*/

angular.module('jgAccount')
  .controller('jgAccount-MainController', function ($scope, $location) {
    'use strict';

    $scope.loginSubmit = function () {
      $location.path('/main');
    };
  })
;