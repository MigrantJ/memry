/*global angular*/

angular.module('memryMain')
  .directive('usernameDropdown', function(defModel, jgAccountAccount) {
    'use strict';
    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'views/username-dropdown.html',
      scope: {},
      link: function (scope) {
        //automatically update the def list when the model changes
        scope.$watch(function () { return defModel.data; }, function (newVal) {
          if (typeof newVal !== 'undefined') {
            scope.username = defModel.data.username;
            scope.currentListName = defModel.data.currentListName;
            scope.listnames = defModel.data.listnames;
          }
        });

        scope.switchList = function (listname) {
          console.log(listname);
        };

        scope.logoff = function () {
          jgAccountAccount.logoff();
        };
      }
    };
  });