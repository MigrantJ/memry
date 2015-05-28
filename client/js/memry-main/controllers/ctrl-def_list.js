/*global angular*/

angular.module('memryMain')
  .controller('DefListController', function ($scope, defModel) {
    'use strict';

    //automatically update the def list when the model changes
    defModel.registerObserver(function () {
      $scope.definitions = defModel.data.defs;
    });

    $scope.turnOffEditModeAll = function() {
      $scope.definitions.forEach(function(d) {
        d.editMode = false;
      });
    };

    //this makes sure that logging in as a different user refreshes the deflist
    defModel.getDefs();
  })
;