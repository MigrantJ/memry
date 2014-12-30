/*global angular*/

angular.module('memry')
  .directive('deflink', function() {
    'use strict';
    return {
      restrict: 'E',
      link: function(scope, elem, attrs) {
        elem.html('<span class=\'fake-a\'>' + elem.html() + '</span>');
        elem.bind('click', function() {
          scope.scrollToDefByID(attrs.d);
        });
      }
    };
  });