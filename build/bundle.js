"use strict";angular.module("memry",["ngRoute"]),angular.module("memry").config(["$routeProvider",function(e){e.when("/",{templateUrl:"views/main.html"})}]),angular.module("memry").controller("DefinitionFormController",["$scope","defModel",function(e,t){e.hideDescription=!0,e.titleChange=function(){var n=t.findIDByTitleSubstr(e.title);e.hideDescription=n||""===e.title},e.titleInputBegin=function(){},e.titleInputEnd=function(){},e.addDefinition=function(){e.title&&e.description&&(t.addDefinition(e.title,e.description),e.title="",e.description="",e.hideDescription=!0)}}]),angular.module("memry").controller("DefinitionListController",["$scope","defModel",function(e,t){t.getDefs().then(function(t){e.definitions=t.data}),e.turnOnEditMode=function(t){e.definitions.forEach(function(e){e.editMode=!1}),e.definitions[t].editMode=!0},e.turnOffEditMode=function(t){e.definitions[t].editMode=!1},e.editDefinition=function(n,i){e.turnOffEditMode(n),t.editDefinition(i)},e.delDefinition=function(e){t.deleteDefinition(e)}}]),angular.module("memry").controller("MainController",function(){}),angular.module("memry").factory("defModel",["$q","defServer",function(e,t){function n(){t.getAll().then(function(e){o.defs=e.data})}var i={},o={};return i.getDefs=function(){var e=t.getAll();return e.then(function(e){o.defs=e.data}),e},i.addDefinition=function(e,n){t.create({title:e,description:n}).then(function(e){console.log(e.data),i.getDefs()})},i.editDefinition=function(e){t.update(e).then(function(e){console.log(e.data),i.getDefs()})},i.deleteDefinition=function(e){t.delete(e).then(function(e){console.log(e.data),i.getDefs()})},i.findIDByTitleSubstr=function(e){if("string"!=typeof e)throw new Error("findIDByTitleSubstr requires string input");var t=null;return o.defs.forEach(function(n){var i=n.title.indexOf(e);return 0===i?(t=n._id,!0):void 0}),t},n(),i}]),angular.module("memry").factory("defServer",["$http",function(e){return{getAll:function(){return e.get("/api/defs")},getOne:function(t){return e.get("/api/defs/"+t)},create:function(t){return e.post("/api/defs",t)},update:function(t){return e.put("/api/defs/"+t._id,t)},"delete":function(t){return e.delete("/api/defs/"+t)}}}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lbXJ5L21vZHVsZS5qcyIsIm1lbXJ5L2NvbmZpZy9jZmctcm91dGVzLmpzIiwibWVtcnkvY29udHJvbGxlcnMvY3RybC1kZWZfZm9ybS5qcyIsIm1lbXJ5L2NvbnRyb2xsZXJzL2N0cmwtZGVmX2xpc3QuanMiLCJtZW1yeS9jb250cm9sbGVycy9jdHJsLW1haW4uanMiLCJtZW1yeS9zZXJ2aWNlcy9zcnZjLWRlZl9tb2RlbC5qcyIsIm1lbXJ5L3NlcnZpY2VzL3NydmMtZGVmX3NlcnZlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxZQUVBLFNBQUEsT0FBQSxTQUFBLFlDREEsUUFBQSxPQUFBLFNBQ0EsUUFBQSxpQkFBQSxTQUFBLEdBRUEsRUFDQSxLQUFBLEtBQ0EsWUFBQSx1QkNMQSxRQUFBLE9BQUEsU0FDQSxXQUFBLDRCQUFBLFNBQUEsV0FBQSxTQUFBLEVBQUEsR0FFQSxFQUFBLGlCQUFBLEVBQ0EsRUFBQSxZQUFBLFdBQ0EsR0FBQSxHQUFBLEVBQUEsb0JBQUEsRUFBQSxNQUNBLEdBQUEsZ0JBQUEsR0FBQSxLQUFBLEVBQUEsT0FHQSxFQUFBLGdCQUFBLGFBSUEsRUFBQSxjQUFBLGFBSUEsRUFBQSxjQUFBLFdBQ0EsRUFBQSxPQUFBLEVBQUEsY0FDQSxFQUFBLGNBQUEsRUFBQSxNQUFBLEVBQUEsYUFHQSxFQUFBLE1BQUEsR0FDQSxFQUFBLFlBQUEsR0FDQSxFQUFBLGlCQUFBLE9DeEJBLFFBQUEsT0FBQSxTQUNBLFdBQUEsNEJBQUEsU0FBQSxXQUFBLFNBQUEsRUFBQSxHQUdBLEVBQUEsVUFBQSxLQUFBLFNBQUEsR0FDQSxFQUFBLFlBQUEsRUFBQSxPQUdBLEVBQUEsZUFBQSxTQUFBLEdBQ0EsRUFBQSxZQUFBLFFBQUEsU0FBQSxHQUNBLEVBQUEsVUFBQSxJQUVBLEVBQUEsWUFBQSxHQUFBLFVBQUEsR0FHQSxFQUFBLGdCQUFBLFNBQUEsR0FDQSxFQUFBLFlBQUEsR0FBQSxVQUFBLEdBSUEsRUFBQSxlQUFBLFNBQUEsRUFBQSxHQUNBLEVBQUEsZ0JBQUEsR0FHQSxFQUFBLGVBQUEsSUFHQSxFQUFBLGNBQUEsU0FBQSxHQUNBLEVBQUEsaUJBQUEsT0M1QkEsUUFBQSxPQUFBLFNBQ0EsV0FBQSxpQkFBQSxjQ0RBLFFBQUEsT0FBQSxTQUNBLFFBQUEsWUFBQSxLQUFBLFlBQUEsU0FBQSxFQUFBLEdBUUEsUUFBQSxLQUNBLEVBQUEsU0FDQSxLQUFBLFNBQUEsR0FDQSxFQUFBLEtBQUEsRUFBQSxPQVJBLEdBQUEsTUFFQSxJQW1GQSxPQXpFQSxHQUFBLFFBQUEsV0FFQSxHQUFBLEdBQUEsRUFBQSxRQUlBLE9BSEEsR0FBQSxLQUFBLFNBQUEsR0FDQSxFQUFBLEtBQUEsRUFBQSxPQUVBLEdBTUEsRUFBQSxjQUFBLFNBQUEsRUFBQSxHQUNBLEVBQUEsUUFDQSxNQUFBLEVBQ0EsWUFBQSxJQUVBLEtBQUEsU0FBQSxHQUNBLFFBQUEsSUFBQSxFQUFBLE1BQ0EsRUFBQSxhQU9BLEVBQUEsZUFBQSxTQUFBLEdBQ0EsRUFBQSxPQUFBLEdBQ0EsS0FBQSxTQUFBLEdBRUEsUUFBQSxJQUFBLEVBQUEsTUFDQSxFQUFBLGFBT0EsRUFBQSxpQkFBQSxTQUFBLEdBQ0EsRUFBQSxPQUFBLEdBQ0EsS0FBQSxTQUFBLEdBRUEsUUFBQSxJQUFBLEVBQUEsTUFDQSxFQUFBLGFBU0EsRUFBQSxvQkFBQSxTQUFBLEdBRUEsR0FBQSxnQkFBQSxHQUNBLEtBQUEsSUFBQSxPQUFBLDRDQUVBLElBQUEsR0FBQSxJQVdBLE9BVkEsR0FBQSxLQUFBLFFBQUEsU0FBQSxHQUNBLEdBQUEsR0FBQSxFQUFBLE1BQUEsUUFBQSxFQUVBLE9BQUEsS0FBQSxHQUNBLEVBQUEsRUFBQSxLQUVBLEdBSEEsU0FPQSxHQUdBLElBRUEsS0N6RkEsUUFBQSxPQUFBLFNBQ0EsUUFBQSxhQUFBLFFBQUEsU0FBQSxHQUVBLE9BQ0EsT0FBQSxXQUNBLE1BQUEsR0FBQSxJQUFBLGNBR0EsT0FBQSxTQUFBLEdBQ0EsTUFBQSxHQUFBLElBQUEsYUFBQSxJQUdBLE9BQUEsU0FBQSxHQUNBLE1BQUEsR0FBQSxLQUFBLFlBQUEsSUFHQSxPQUFBLFNBQUEsR0FDQSxNQUFBLEdBQUEsSUFBQSxhQUFBLEVBQUEsSUFBQSxJQUdBLFNBQUEsU0FBQSxHQUNBLE1BQUEsR0FBQSxPQUFBLGFBQUEiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypnbG9iYWwgYW5ndWxhciovXG4ndXNlIHN0cmljdCc7XG5cbmFuZ3VsYXIubW9kdWxlKCdtZW1yeScsIFsnbmdSb3V0ZSddKTtcbiIsIi8qZ2xvYmFsIGFuZ3VsYXIqL1xuXG5hbmd1bGFyLm1vZHVsZSgnbWVtcnknKVxuICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICAkcm91dGVQcm92aWRlclxuICAgICAgLndoZW4oJy8nLCB7XG4gICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvbWFpbi5odG1sJ1xuICAgICAgfSk7XG4gIH0pXG47IiwiLypnbG9iYWwgYW5ndWxhciovXG5cbmFuZ3VsYXIubW9kdWxlKCdtZW1yeScpXG4gIC5jb250cm9sbGVyKCdEZWZpbml0aW9uRm9ybUNvbnRyb2xsZXInLCBmdW5jdGlvbiAoJHNjb3BlLCBkZWZNb2RlbCkge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICAkc2NvcGUuaGlkZURlc2NyaXB0aW9uID0gdHJ1ZTtcbiAgICAkc2NvcGUudGl0bGVDaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBmb3VuZFRpdGxlID0gZGVmTW9kZWwuZmluZElEQnlUaXRsZVN1YnN0cigkc2NvcGUudGl0bGUpO1xuICAgICAgJHNjb3BlLmhpZGVEZXNjcmlwdGlvbiA9IChmb3VuZFRpdGxlIHx8ICRzY29wZS50aXRsZSA9PT0gJycpO1xuICAgIH07XG5cbiAgICAkc2NvcGUudGl0bGVJbnB1dEJlZ2luID0gZnVuY3Rpb24oKSB7XG4gICAgICAvLyRzY29wZS5jdXJyZW50U2Nyb2xsRGVmSUQgPSBudWxsO1xuICAgIH07XG5cbiAgICAkc2NvcGUudGl0bGVJbnB1dEVuZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgLy8kc2NvcGUuY3VycmVudFNjcm9sbERlZklEID0gbnVsbDtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmFkZERlZmluaXRpb24gPSBmdW5jdGlvbigpe1xuICAgICAgaWYgKCRzY29wZS50aXRsZSAmJiAkc2NvcGUuZGVzY3JpcHRpb24pIHtcbiAgICAgICAgZGVmTW9kZWwuYWRkRGVmaW5pdGlvbigkc2NvcGUudGl0bGUsICRzY29wZS5kZXNjcmlwdGlvbik7XG5cbiAgICAgICAgLy9ibGFuayBvdXQgdGhlIGZvcm1cbiAgICAgICAgJHNjb3BlLnRpdGxlID0gJyc7XG4gICAgICAgICRzY29wZS5kZXNjcmlwdGlvbiA9ICcnO1xuICAgICAgICAkc2NvcGUuaGlkZURlc2NyaXB0aW9uID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9O1xuICB9KVxuOyIsIi8qZ2xvYmFsIGFuZ3VsYXIqL1xuXG5hbmd1bGFyLm1vZHVsZSgnbWVtcnknKVxuICAuY29udHJvbGxlcignRGVmaW5pdGlvbkxpc3RDb250cm9sbGVyJywgZnVuY3Rpb24gKCRzY29wZSwgZGVmTW9kZWwpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBkZWZNb2RlbC5nZXREZWZzKCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICRzY29wZS5kZWZpbml0aW9ucyA9IHJlc3BvbnNlLmRhdGE7XG4gICAgfSk7XG5cbiAgICAkc2NvcGUudHVybk9uRWRpdE1vZGUgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICAgJHNjb3BlLmRlZmluaXRpb25zLmZvckVhY2goZnVuY3Rpb24oZCkge1xuICAgICAgICBkLmVkaXRNb2RlID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICAgICRzY29wZS5kZWZpbml0aW9uc1tpbmRleF0uZWRpdE1vZGUgPSB0cnVlO1xuICAgIH07XG5cbiAgICAkc2NvcGUudHVybk9mZkVkaXRNb2RlID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgICRzY29wZS5kZWZpbml0aW9uc1tpbmRleF0uZWRpdE1vZGUgPSBmYWxzZTtcbiAgICB9O1xuXG4gICAgLy90b2RvIG5lZWQgdG8gZWl0aGVyIHBhc3MgZGVmX2lkIG9yIGZpbmQgYSB2ZXJzaW9uIG9mICRpbmRleCB0aGF0IHRyYWNrcyB0aGUgdW5zb3J0ZWQgb3JkZXIuIG9yIGFscGhhIHNvcnQgaW4gdGhlIGRhdGFiYXNlIChvciBpbiB0aGUgcmV0cmlldmVkIHZlcnNpb24hKVxuICAgICRzY29wZS5lZGl0RGVmaW5pdGlvbiA9IGZ1bmN0aW9uKGluZGV4LCBkZWYpIHtcbiAgICAgICRzY29wZS50dXJuT2ZmRWRpdE1vZGUoaW5kZXgpO1xuICAgICAgLy90ZW1wb3JhcmlseSBjaGFuZ2UgdGhlIHZpc2libGUgZGVzY3JpcHRpb24gc28gdGhlcmUncyBpbW1lZGlhdGUgdXBkYXRlIGJlZm9yZSBzZXJ2ZXIgcmVzcG9uZHNcbiAgICAgIC8vJHNjb3BlLmRlZmluaXRpb25zW2luZGV4XS5kZXNjcmlwdGlvblVSTCA9ICRzY29wZS5kZWZpbml0aW9uc1tpbmRleF0uZGVzY3JpcHRpb247XG4gICAgICBkZWZNb2RlbC5lZGl0RGVmaW5pdGlvbihkZWYpO1xuICAgIH07XG5cbiAgICAkc2NvcGUuZGVsRGVmaW5pdGlvbiA9IGZ1bmN0aW9uKGlkKXtcbiAgICAgIGRlZk1vZGVsLmRlbGV0ZURlZmluaXRpb24oaWQpO1xuICAgIH07XG4gIH0pXG47IiwiLypnbG9iYWwgYW5ndWxhciovXG5cbmFuZ3VsYXIubW9kdWxlKCdtZW1yeScpXG4gIC5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG4gIH0pXG47IiwiLypnbG9iYWwgYW5ndWxhciovXG5cbmFuZ3VsYXIubW9kdWxlKCdtZW1yeScpXG4gIC5mYWN0b3J5KCdkZWZNb2RlbCcsIGZ1bmN0aW9uICgkcSwgZGVmU2VydmVyKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIC8vcHVibGljIG1ldGhvZHNcbiAgICB2YXIgYXBpID0ge307XG4gICAgLy9wcml2YXRlIGRhdGFcbiAgICB2YXIgZGF0YSA9IHt9O1xuXG4gICAgLy9jb25zdHJ1Y3RvclxuICAgIGZ1bmN0aW9uIGNvbnN0cnVjdG9yKCkge1xuICAgICAgZGVmU2VydmVyLmdldEFsbCgpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgIGRhdGEuZGVmcyA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFwaS5nZXREZWZzID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy90b2RvIHRoaXMgaXMgZG9pbmcgdGhlIHNhbWUgdGhpbmcgYXMgdGhlIGNvbnN0cnVjdG9yXG4gICAgICB2YXIgcHJvbWlzZSA9IGRlZlNlcnZlci5nZXRBbGwoKTtcbiAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgZGF0YS5kZWZzID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfTtcblxuICAgIC8qXG4gICAgIyBhZGREZWZpbml0aW9uXG4gICAgKi9cbiAgICBhcGkuYWRkRGVmaW5pdGlvbiA9IGZ1bmN0aW9uICh0aXRsZSwgZGVzY3JpcHRpb24pIHtcbiAgICAgIGRlZlNlcnZlci5jcmVhdGUoe1xuICAgICAgICB0aXRsZTogdGl0bGUsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvblxuICAgICAgfSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgYXBpLmdldERlZnMoKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8qXG4gICAgIyBlZGl0RGVmaW5pdGlvblxuICAgICovXG4gICAgYXBpLmVkaXREZWZpbml0aW9uID0gZnVuY3Rpb24gKGRlZmluaXRpb24pIHtcbiAgICAgIGRlZlNlcnZlci51cGRhdGUoZGVmaW5pdGlvbilcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgLy90b2RvOiBkb24ndCByZXF1aXJlIGEgc2VydmVyIGdldCBldmVyeSB0aW1lIHdlIGNoYW5nZSB0aGUgZGF0YVxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgIGFwaS5nZXREZWZzKCk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvKlxuICAgICAjIGRlbGV0ZURlZmluaXRpb25cbiAgICAgKi9cbiAgICBhcGkuZGVsZXRlRGVmaW5pdGlvbiA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgZGVmU2VydmVyLmRlbGV0ZShpZClcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgLy90b2RvOiBkb24ndCByZXF1aXJlIGEgc2VydmVyIGdldCBldmVyeSB0aW1lIHdlIGNoYW5nZSB0aGUgZGF0YVxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgIGFwaS5nZXREZWZzKCk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvKlxuICAgICMgZmluZElEQnlUaXRsZVN1YnN0clxuICAgIHJldHVybnMgdGhlIGlkIG9mIHRoZSBmaXJzdCBkZWZpbml0aW9uIHdob3NlIHRpdGxlIGJlZ2lucyB3aXRoIHRoZSBzdWJzdHJpbmcuXG4gICAgcmVsaWVzIG9uIHRoZSBzZXJ2ZXIgcmV0dXJuaW5nIHRoZSBkZWZzIHNvcnRlZCBhbHBoYWJldGljYWxseSBieSB0aXRsZVxuICAgICovXG4gICAgYXBpLmZpbmRJREJ5VGl0bGVTdWJzdHIgPSBmdW5jdGlvbiAodGl0bGVTdWJzdHIpIHtcbiAgICAgIC8vaW5wdXQgdmFsaWRhdGlvblxuICAgICAgaWYgKHR5cGVvZiB0aXRsZVN1YnN0ciAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdmaW5kSURCeVRpdGxlU3Vic3RyIHJlcXVpcmVzIHN0cmluZyBpbnB1dCcpO1xuICAgICAgfVxuICAgICAgdmFyIGZvdW5kVGl0bGVJRCA9IG51bGw7XG4gICAgICBkYXRhLmRlZnMuZm9yRWFjaChmdW5jdGlvbiAoZCkge1xuICAgICAgICB2YXIgaW5kZXggPSBkLnRpdGxlLmluZGV4T2YodGl0bGVTdWJzdHIpO1xuICAgICAgICAvL2lmIGluZGV4IGlzIDAsIHdlIGZvdW5kIGEgbWF0Y2hpbmcgdGl0bGVcbiAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgICAgZm91bmRUaXRsZUlEID0gZC5faWQ7XG4gICAgICAgICAgLy9lbmQgdGhlIGZvckVhY2ggbG9vcFxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGZvdW5kVGl0bGVJRDtcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IoKTtcblxuICAgIHJldHVybiBhcGk7XG4gIH0pXG47IiwiLypnbG9iYWwgYW5ndWxhciovXG5cbmFuZ3VsYXIubW9kdWxlKCdtZW1yeScpXG4gIC5mYWN0b3J5KCdkZWZTZXJ2ZXInLCBmdW5jdGlvbiAoJGh0dHApIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgcmV0dXJuIHtcbiAgICAgIGdldEFsbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9hcGkvZGVmcycpO1xuICAgICAgfSxcblxuICAgICAgZ2V0T25lOiBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL2FwaS9kZWZzLycgKyBpZCk7XG4gICAgICB9LFxuXG4gICAgICBjcmVhdGU6IGZ1bmN0aW9uIChkZWYpIHtcbiAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9hcGkvZGVmcycsIGRlZik7XG4gICAgICB9LFxuXG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkZWYpIHtcbiAgICAgICAgcmV0dXJuICRodHRwLnB1dCgnL2FwaS9kZWZzLycgKyBkZWYuX2lkLCBkZWYpO1xuICAgICAgfSxcblxuICAgICAgZGVsZXRlOiBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuICRodHRwLmRlbGV0ZSgnL2FwaS9kZWZzLycgKyBpZCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSlcbjsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=