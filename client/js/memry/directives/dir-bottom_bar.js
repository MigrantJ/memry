/*global angular*/

angular.module('memry')
  .directive('bottomBar', function($modal) {
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
      }
    };
  });