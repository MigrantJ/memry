/*global angular*/

angular.module('memryMain')
  .directive('deflink', function(scrollToDef) {
    'use strict';
    return {
      restrict: 'E',
      link: function(scope, elem, attrs) {
        elem.html('<span class=\'fake-a\'>' + elem.html() + '</span>');
        elem.bind('click', function() {
          scrollToDef.byID(attrs.d);
        });
      }
    };
  });