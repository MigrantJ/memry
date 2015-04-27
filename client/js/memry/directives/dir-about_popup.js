/*global angular*/

angular.module('memry')
  .directive('aboutPopup', function() {
    'use strict';
    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'views/about-popup.html'
    };
  });