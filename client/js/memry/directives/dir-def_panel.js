/*global angular*/

angular.module('memry')
  .directive('defPanel', function(defModel) {
    'use strict';
    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'views/def-panel.html',
      scope: {
        def: '='
      },
      link: function (scope) {
        scope.editMode = false;
        var resetForm = function () {
          scope.editTitle = scope.def.title;
          scope.editDescription = scope.def.description;
        };
        resetForm();

        scope.toggleEditMode = function () {
          if (scope.editMode) {
            resetForm();
          }
          scope.editMode = !scope.editMode;
        };

        scope.submitDef = function () {
          scope.def.title = scope.editTitle;
          scope.def.description = scope.editDescription;
          defModel.editDefinition(scope.def);
          scope.toggleEditMode();
        };

        scope.removeDef = function () {
          defModel.deleteDefinition(scope.def._id);
        };
      }
    };
  });