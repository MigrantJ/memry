/*global angular*/

angular.module('memryMain')
  .config(function ($routeProvider) {
    'use strict';
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html'
      })
      .when('/main', {
        templateUrl: 'views/main.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
;