/*global angular*/

angular.module('memry')
  .directive('defPanel', function() {
    'use strict';
    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'views/def-panel.html',
      link: function () {
      }
    };
  });