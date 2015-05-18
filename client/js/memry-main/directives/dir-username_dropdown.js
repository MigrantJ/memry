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
        jgAccountAccount.getUserName().then(function (res) {
          scope.username = res.data.username;
        });

        scope.logoff = function () {
          jgAccountAccount.logoff();
        };
      }
    };
  });