/*global angular*/

angular.module('memry')
  .config(function ($routeProvider) {
    'use strict';
    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'jgAccount-MainController'
      })
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainController'
      })
      .otherwise({
        redirectTo: '/login'
      });
  })
;