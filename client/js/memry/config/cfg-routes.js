/*global angular*/

angular.module('memry')
  .config(function ($routeProvider, $httpProvider) {
    'use strict';
    //ensures all http requests have auth headers, ties into service
    $httpProvider.interceptors.push('jgAccountTokenInterceptor');

    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'jgAccount-MainController',
        access: {
          requiresLogin: false
        }
      })
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainController',
        access: {
          requiresLogin: true
        }
      })
      .otherwise({
        redirectTo: '/login'
      });
  })
  .run(function ($rootScope, $location, $templateCache, jgAccountAccount) {
    'use strict';
    var user = jgAccountAccount;
    //on refresh / new route, check if user is already logged in
    $rootScope.$on('$routeChangeStart', function (event, nextRoute) {
      if (nextRoute.access && nextRoute.access.requiresLogin && !user.isLoggedIn()) {
        $location.path('/login');
      }
    });
  })
;