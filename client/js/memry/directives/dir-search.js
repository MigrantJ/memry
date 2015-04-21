/*global angular*/

angular.module('memry')
  .directive('mmSearch', function(scrollToDef, defModel) {
    'use strict';
    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'views/search.html',
      link: function (scope) {
        scope.resetScrollID = function () {
          scrollToDef.resetID();
        };
        scope.searchForTitle = function () {
          var foundTitleID = defModel.findIDByTitleSubstr(scope.title);
          scrollToDef.byID(foundTitleID);
        };
      }
    };
  });