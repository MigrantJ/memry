/*global angular*/

angular.module('memry')
  .controller('DefListController', function ($scope, defModel) {
    'use strict';

    //automatically update the def list when the model changes
    $scope.$watch(function () { return defModel.data.defs; }, function (newVal) {
      if (typeof newVal !== 'undefined') {
        $scope.definitions = defModel.data.defs;
      }
    });

    $scope.turnOffEditModeAll = function() {
      $scope.definitions.forEach(function(d) {
        d.editMode = false;
      });
    };
  })
;