/*global angular*/

angular.module('memry')
  .controller('DefinitionFormController', function ($scope, defServer) {
    'use strict';
    $scope.hideDescription = true;
    $scope.titleChange = function() {
      /*
      var foundTitle = $scope.scrollToDefByTitle($scope.title);

      if (foundTitle !== '' || $scope.title === '') {
        $scope.hideDescription = true;
      } else {
        $scope.hideDescription = false;
      }
      */
      if ($scope.title === '') {
        $scope.hideDescription = true;
      } else {
        $scope.hideDescription = false;
      }
    };

    $scope.titleInputBegin = function() {
      //$scope.currentScrollDefID = null;
    };

    $scope.titleInputEnd = function() {
      //$scope.currentScrollDefID = null;
    };

    $scope.addDefinition = function(){
      if ($scope.title && $scope.description) {
        var definition = {
          title: $scope.title,
          description: $scope.description
        };

        defServer.create(definition);

        //blank out the form
        $scope.title = '';
        $scope.description = '';
        $scope.hideDescription = true;
      }
    };
  })
;