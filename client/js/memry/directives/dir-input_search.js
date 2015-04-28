/*global angular*/

angular.module('memry')
  .directive('inputSearch', function(scrollToDef, defModel) {
    'use strict';
    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'views/input-search.html',
      scope: {
        title: '=',
        defAdded: '&'
      },
      link: function (scope) {
        scope.searchInFocus = false;

        scope.$on('defAdded', function (event, title) {
          //wipe the form
          scope.title = '';
          scrollToDef.byTitle(title);
        });

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

        scope.addButton = function () {
          defModel.addDefinition(scope.title, '')
            .then(function () {
              scope.defAdded();
            }
          );
        };

        scope.isInvalid = function () {
          return scope.title === '' || defModel.findDefByTitle(scope.title);
        };
      }
    };
  });