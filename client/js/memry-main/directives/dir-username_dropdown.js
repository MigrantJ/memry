/*global angular*/

angular.module('memryMain')
  .directive('usernameDropdown', function(jgAccountAccount) {
    'use strict';
    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'views/username-dropdown.html',
      scope: {

      },
      link: function (scope) {
        scope.logoff = function () {
          jgAccountAccount.logoff();
        };
      }
    };
  });