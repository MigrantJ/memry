/*global angular*/

angular.module('memryMain')
  .directive('usernameDropdown', function(defModel, jgAccountAccount) {
    'use strict';
    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'views/username-dropdown.html',
      scope: {

      },
      link: function (scope) {
        //automatically update the def list when the model changes
        scope.$watch(function () { return defModel.data.username; }, function (newVal) {
          if (typeof newVal !== 'undefined') {
            scope.username = defModel.data.username;
          }
        });

        scope.logoff = function () {
          jgAccountAccount.logoff();
        };
      }
    };
  });