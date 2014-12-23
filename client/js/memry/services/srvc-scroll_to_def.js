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
      if (data.currentScrollDefID !== id) {
        data.currentScrollDefID = id;
        var defElement = angular.element(document.getElementById(id));
        $document.scrollTo(defElement, 0, 1000);
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