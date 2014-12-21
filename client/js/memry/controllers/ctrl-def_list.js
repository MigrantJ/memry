/*global angular*/

angular.module('memry')
  .controller('DefinitionListController', function ($scope, defModel) {
    'use strict';

    defModel.getDefs().then(function (response) {
      $scope.definitions = response.data;
    });

    $scope.turnOnEditMode = function(index) {
      $scope.definitions.forEach(function(d) {
        d.editMode = false;
      });
      $scope.definitions[index].editMode = true;
    };

    $scope.turnOffEditMode = function(index) {
      $scope.definitions[index].editMode = false;
    };

    //todo need to either pass def_id or find a version of $index that tracks the unsorted order. or alpha sort in the database (or in the retrieved version!)
    $scope.editDefinition = function(index, def) {
      $scope.turnOffEditMode(index);
      //temporarily change the visible description so there's immediate update before server responds
      //$scope.definitions[index].descriptionURL = $scope.definitions[index].description;
      defModel.editDefinition(def);
    };

    $scope.delDefinition = function(id){
      defModel.deleteDefinition(id);
    };
  })
;