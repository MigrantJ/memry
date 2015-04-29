/*global angular*/

angular.module('memryMain')
  .directive('inputSearch', function(scrollToDef, defModel) {
    'use strict';
    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'views/input-search.html',
      scope: {
        title: '=',
        defAdded: '&',
        defEdit: '&'
      },
      link: function (scope, element) {
        scope.searchInFocus = false;

        scope.$on('defAdded', function (event, title) {
          //wipe the form
          scope.title = '';
          scrollToDef.byTitle(title);
        });

        scope.titleFound = function () {
          return defModel.findDefByTitle(scope.title);
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
          if (!scope.title) {
            //focus on search input
            element[0].querySelector('.title-input').focus();
          }
          else if (scope.titleFound()) {
            //edit description of found def. broadcasts event from main controller
            scope.defEdit();
          }
          else {
            //add a new def to the list. broadcasts event from main controller
            defModel.addDefinition(scope.title, '')
              .then(function () {
                scope.defAdded();
              }
            );
          }
        };
      }
    };
  });