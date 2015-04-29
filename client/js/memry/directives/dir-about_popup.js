/*global angular*/

angular.module('memryMain')
  .directive('aboutPopup', function() {
    'use strict';
    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'views/about-popup.html'
    };
  });