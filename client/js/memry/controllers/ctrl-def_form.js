/*global angular*/

angular.module('memry')
  .controller('DefinitionFormController', function ($scope, defModel) {
    'use strict';
    $scope.hideDescription = true;
    $scope.titleChange = function() {
      var foundTitle = defModel.findIDByTitleSubstr($scope.title);
      $scope.hideDescription = (foundTitle || $scope.title === '');
    };

    $scope.titleInputBegin = function() {
      //$scope.currentScrollDefID = null;
    };

    $scope.titleInputEnd = function() {
      //$scope.currentScrollDefID = null;
    };

    $scope.addDefinition = function(){
      if ($scope.title && $scope.description) {
        defModel.addDefinition($scope.title, $scope.description);

        //blank out the form
        $scope.title = '';
        $scope.description = '';
        $scope.hideDescription = true;
      }
    };
  })
;