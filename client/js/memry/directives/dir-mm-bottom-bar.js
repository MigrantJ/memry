/*global angular*/

angular.module('memry')
  .directive('mmBottomBar', function($modal) {
    'use strict';
    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'views/mm-bottom-bar.html',
      link: function (scope) {
        scope.open = function () {
          $modal.open({
            templateUrl: 'views/mm-about-popup.html',
            controller: 'PopupCtrl'
          });
        };
      }
    };
  });