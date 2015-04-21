/*global angular,document*/

angular.module('memry')
  .factory('scrollToDef', function ($document, defModel) {
    'use strict';
    //public methods
    var api = {};
    //private data
    var data = {};

    data.currentScrollDefID = null;

    api.byID = function (id) {
      if (id) {
        var defElement = angular.element(document.getElementById(id));
        if (data.currentScrollDefID !== id) {
          data.currentScrollDefID = id;
          $document.duScrollTo(defElement, 50, 1000);
        } else {
          $document.duScrollTo(defElement, 50, 1000, function (t) { return t; });
        }
      }
    };

    api.byTitle = function (title) {
      //input validation
      if (typeof title !== 'string') {
        throw new Error('scrollToDef.byTitle requires string input');
      }

      if (title !== '') {
        var id = defModel.findIDByTitleSubstr(title);
        if (id) {
          api.byID(id);
        }
      }
    };

    api.resetID = function () {
      data.currentScrollDefID = null;
    };

    return api;
  })
;