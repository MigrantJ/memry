/*global angular*/

angular.module('memry')
  .controller('DefinitionFormController', function ($scope, defModel, scrollToDef) {
    'use strict';
    var resetForm = function () {
      //blank out the form
      $scope.title = '';
      $scope.description = '';
      $scope.hideDescription = true;
    };

    $scope.titleChange = function() {
      var foundTitleID = defModel.findIDByTitleSubstr($scope.title);
      scrollToDef.byID(foundTitleID);
      $scope.hideDescription = defModel.findDefByTitle($scope.title);
    };

    $scope.titleInputBegin = function() {
      scrollToDef.resetID();
    };

    $scope.titleInputEnd = function() {
      scrollToDef.resetID();
    };

    $scope.addDefinition = function(){
      if ($scope.title && $scope.description) {
        defModel.addDefinition($scope.title, $scope.description);
        resetForm();
      }
    };

    $scope.getDescRows = function () {
      return Math.max(6, ($scope.description.length / 40) + 2);
    };

    resetForm();
  })
;