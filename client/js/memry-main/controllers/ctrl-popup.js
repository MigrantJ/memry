/*global angular*/

angular.module('memryMain')
  .controller('PopupCtrl', function ($scope, $modalInstance) {
    'use strict';
    $scope.dismiss = function () {
      $modalInstance.dismiss();
    };
  })
;