/*global angular*/

angular.module('memry')
  .directive('defPanel', function(defModel) {
    'use strict';
    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'views/def-panel.html',
      scope: true,
      link: function (scope) {
        scope.def.editMode = false;
        var resetForm = function () {
          scope.editTitle = scope.def.title;
          scope.editDescription = scope.def.description;
        };
        resetForm();

        scope.$on('defAdded', function (event, title) {
          if (scope.def.title === title) {
            scope.turnOnEditMode();
            //todo: magic that makes description input focused here
          }
        });

        scope.turnOnEditMode = function () {
          scope.turnOffEditModeAll();
          scope.def.editMode = true;
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
      }
    };
  });