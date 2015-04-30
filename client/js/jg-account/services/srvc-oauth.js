/*global angular, OAuth*/

angular.module('jgAccount')
  .factory('jgAccountOauth', function () {
    'use strict';
    var api = {};

    OAuth.initialize('EPoUg3AJilZyHa0soAMbaXUGSVU');

    api.loginFacebook = function () {
      OAuth.popup('facebook').done(function (facebook) {
        console.log(facebook);
      }).fail(function (err) {
        console.log(err);
      });
    };

    return api;
  })
;
