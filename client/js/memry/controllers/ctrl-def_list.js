/*global angular*/

angular.module('memry')
  .controller('DefinitionListController', function ($scope, defServer) {
    'use strict';
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
      defServer.update(def);
    };

    $scope.delDefinition = function(id){
      defServer.delete(id);
    };
  })
;