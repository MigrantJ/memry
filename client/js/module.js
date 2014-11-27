/*global angular*/
'use strict';

var memryApp = angular.module('memryApp', []);

memryApp.controller('MemryController', function ($scope) {
  $scope.test = 'testing angular';
});