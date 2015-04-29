/*global angular*/

angular.module('memryMain')
  .factory('defServer', function ($http) {
    'use strict';
    return {
      getAll: function() {
        return $http.get('/api/defs');
      },

      getOne: function (id) {
        return $http.get('/api/defs/' + id);
      },

      create: function (def) {
        return $http.post('/api/defs', def);
      },

      update: function (def) {
        return $http.put('/api/defs/' + def._id, def);
      },

      delete: function (id) {
        return $http.delete('/api/defs/' + id);
      }
    };
  })
;