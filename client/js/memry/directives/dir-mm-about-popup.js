/*global angular*/

angular.module('memry')
  .directive('mmAboutPopup', function() {
    'use strict';
    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'views/mm-about-popup.html'
    };
  });