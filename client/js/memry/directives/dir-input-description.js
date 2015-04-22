/*global angular*/

angular.module('memry')
  .directive('inputDescription', function(scrollToDef) {
    'use strict';
    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'views/input-description.html',
      link: function (scope) {
        scope.isCollapsed = true;

        scrollToDef.registerObserver(function () {
          scope.isCollapsed = scrollToDef.isDefFound();
        });

        scope.getDescRows = function () {
          if(scope.description) {
            return Math.max(2, (scope.description.length / 35));
          }
        };
      }
    };
  });