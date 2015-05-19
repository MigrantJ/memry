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
  .run(function ($rootScope, $location, jgAccountAccount) {
    'use strict';

    //on refresh / new route, check if user is already logged in
    $rootScope.$on('$routeChangeStart', function () {
      if (jgAccountAccount.isLoggedIn()) {
        $location.path('/main');
      }
    });
  })
;