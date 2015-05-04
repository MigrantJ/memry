/*global angular*/

angular.module('memryMain')
  .directive('defPanel', function(defModel, $timeout) {
    'use strict';
    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'views/def-panel.html',
      scope: true,
      link: function (scope, element) {
        var resetForm = function () {
          scope.editTitle = scope.def.title;
          scope.editDescription = scope.def.description;
        };

        if (scope.def) {
          scope.def.editMode = false;
          resetForm();
        }

        scope.$on('defAdded', function (event, title) {
          if (scope.def.title === title) {
            scope.turnOnEditMode();
          }
        });

        scope.$on('defEdit', function (event, title) {
          if (scope.def.title === title) {
            scope.turnOnEditMode();
          }
        });

        scope.turnOnEditMode = function () {
          scope.turnOffEditModeAll();
          scope.def.editMode = true;
          //todo: really wish I didn't need the timeout hack here
          $timeout(function () {
            element[0].querySelector('.description-input').focus();
          });
        };

        scope.turnOffEditMode = function () {
          scope.def.editMode = false;
          resetForm();
        };

        scope.submitDef = function () {
          scope.def.title = scope.editTitle;
          scope.def.description = scope.editDescription;
          defModel.editDefinition(scope.def);
          scope.turnOffEditMode();
        };

        scope.removeDef = function () {
          defModel.deleteDefinition(scope.def._id);
        };

        scope.getDescRows = function () {
          if(scope.editDescription) {
            return Math.max(4, (scope.editDescription.length / 35));
          } else {
            return 4;
          }
        };
      }
    };
  });