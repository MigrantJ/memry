/*global angular*/

angular.module('memryMain')
  .directive('bottomBar', function($modal, $http) {
    'use strict';
    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'views/bottom-bar.html',
      link: function (scope) {
        scope.open = function () {
          $modal.open({
            templateUrl: 'views/about-popup.html',
            controller: 'PopupCtrl'
          });
        };

        scope.showAllUsers = function () {
          $http.get('/api/users/all');
        };

        scope.showAllDefs = function () {
          $http.get('/api/defs/all');
        };
      }
    };
  });