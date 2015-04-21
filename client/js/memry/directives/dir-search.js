/*global angular*/

angular.module('memry')
  .directive('mmSearch', function(scrollToDef) {
    'use strict';
    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'views/search.html',
      link: function (scope) {
        scope.searchInFocus = false;

        scope.titleFound = function () {
          return !scope.title || scrollToDef.isDefFound();
        };

        scope.onSearchFocus = function () {
          scope.searchInFocus = true;
        };

        scope.onSearchBlur = function () {
          scope.searchInFocus = false;
        };

        scope.onSearchChange = function () {
          scrollToDef.byTitle(scope.title);
        };
      }
    };
  });