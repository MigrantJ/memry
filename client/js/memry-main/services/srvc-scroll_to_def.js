/*global angular,document*/

angular.module('memryMain')
  .factory('scrollToDef', function ($document, defModel) {
    'use strict';
    //public methods
    var api = {};
    //private data
    var data = {};
    var observerCallbacks = [];

    data.currentScrollDefID = null;
    data.titleFound = null;

    var getDefElementByID = function (id) {
      return angular.element(document.getElementById(id));
    };

    var notifyObservers = function () {
      angular.forEach(observerCallbacks, function (cb) {
        cb();
      });
    };

    api.byID = function (id) {
      if (id) {
        var defElement = getDefElementByID(id);
        if (data.currentScrollDefID !== id) {
          data.currentScrollDefID = id;
        }
        api.byElement(defElement);
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
          data.titleFound = true;
        } else {
          data.titleFound = false;
          id = defModel.findIDByClosestTitle(title);
        }
        notifyObservers();
        api.byID(id);
      }
    };

    api.byElement = function (e) {
      $document.duScrollTo(e, 50, 1000, function (t) { return t; });
    };

    api.resetID = function () {
      data.currentScrollDefID = null;
    };

    api.isDefFound = function () {
      return data.titleFound;
    };

    api.registerObserver = function (cb) {
      observerCallbacks.push(cb);
    };

    return api;
  })
;