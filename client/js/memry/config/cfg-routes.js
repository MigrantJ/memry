/*global angular*/

angular.module('memry')
  .config(function ($routeProvider) {
    'use strict';
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
    var user = jgAccountAccount;
    //on refresh / new route, check if user is already logged in
    $rootScope.$on('$routeChangeStart', function (event, nextRoute) {
      if (nextRoute.access && nextRoute.access.requiresLogin && !user.isLoggedIn()) {
        $location.path('/login');
      }
    });
  })
;