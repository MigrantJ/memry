/*global angular*/

angular.module('memry')
  .controller('MainController', function ($scope, $timeout) {
    'use strict';
    $scope.events = {
      defAdded: function (title) {
        //todo: somehow make it so the timeout isn't necessary to let angular catch up
        $timeout(function () {
          $scope.$broadcast('defAdded', title);
        }, 100);
      }
    };
  })
;