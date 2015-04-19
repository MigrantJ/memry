/*global angular*/

angular.module('memry')
  .directive('mmBottomBar', function() {
    'use strict';
    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'views/mm-bottom-bar.html'
    };
  });