/*global angular*/

angular.module('memryMain')
  .directive('jgEnter', function () {
    'use strict';
    return function (scope, element, attrs) {
      element.bind('keydown keypress', function (event) {
        if(event.which === 13 && !event.ctrlKey && !event.altKey && !event.shiftKey) {
          scope.$apply(function (){
            scope.$eval(attrs.jgEnter);
          });

          event.preventDefault();
        }
      });
    };
  })
;