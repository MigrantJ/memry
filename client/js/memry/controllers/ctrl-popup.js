/*global angular*/

angular.module('memry')
  .controller('PopupCtrl', function ($scope, $modalInstance) {
    'use strict';
    $scope.dismiss = function () {
      $modalInstance.dismiss();
    };
  })
;