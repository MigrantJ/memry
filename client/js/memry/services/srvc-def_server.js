/*global angular*/

angular.module('memry')
  .factory('defServer', function ($http) {
    'use strict';
    return {
      getAll: function() {
        $http.get('/api/defs')
          .success(function (data) {
            return data;
          })
          .error(function (data) {
            console.log('Error: ' + data);
          });
      },

      getOne: function (id) {
        $http.get('/api/defs/' + id)
          .success(function (data) {
            return data;
          })
          .error(function (data) {
            console.log('Error: ' + data);
          });
      },

      create: function (def) {
        $http.post('/api/defs', def)
          .success(function (data) {
            return data;
          })
          .error(function (data) {
            console.log('Error: ' + data);
          });
      },

      update: function (def) {
        $http.put('/api/defs/' + def._id, def)
          .success(function (data) {
            return data;
          })
          .error(function (data) {
            console.log('Error: ' + data);
          });
      },

      delete: function (id) {
        $http.delete('/api/defs' + id)
          .success(function (data) {
            return data;
          })
          .error(function (data) {
            console.log('Error: ' + data);
          });
      }
    };
  })
;