/*global angular*/

angular.module('memry')
  .config(function ($routeProvider, $httpProvider) {
    'use strict';
    //ensures all http requests have auth headers, ties into service
    $httpProvider.interceptors.push('jgAccountTokenInterceptor');

    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'MemryLoginController',
        access: {
          requiresLogin: false
        }
      })
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MemryMainController',
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
        //todo: make this work
        //$location.path('/main');
        console.log('you are logged in');
      }
    });
  })
;