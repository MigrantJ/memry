"use strict";angular.module("memry",["ngRoute"]),angular.module("memry").config(["$routeProvider",function(e){e.when("/",{templateUrl:"views/main.html"})}]),angular.module("memry").controller("DefinitionFormController",["$scope","defServer",function(e,n){e.hideDescription=!0,e.titleChange=function(){e.hideDescription=""===e.title?!0:!1},e.titleInputBegin=function(){},e.titleInputEnd=function(){},e.addDefinition=function(){if(e.title&&e.description){var t={title:e.title,description:e.description};n.create(t),e.title="",e.description="",e.hideDescription=!0}}}]),angular.module("memry").controller("DefinitionListController",["$scope","defServer",function(e,n){e.turnOnEditMode=function(n){e.definitions.forEach(function(e){e.editMode=!1}),e.definitions[n].editMode=!0},e.turnOffEditMode=function(n){e.definitions[n].editMode=!1},e.editDefinition=function(t,o){e.turnOffEditMode(t),n.update(o)},e.delDefinition=function(e){n.delete(e)}}]),angular.module("memry").controller("MainController",function(){}),angular.module("memry").factory("defServer",["$http",function(e){return{getAll:function(){e.get("/api/defs").success(function(e){return e}).error(function(e){console.log("Error: "+e)})},getOne:function(n){e.get("/api/defs/"+n).success(function(e){return e}).error(function(e){console.log("Error: "+e)})},create:function(n){e.post("/api/defs",n).success(function(e){return e}).error(function(e){console.log("Error: "+e)})},update:function(n){e.put("/api/defs/"+n._id,n).success(function(e){return e}).error(function(e){console.log("Error: "+e)})},"delete":function(n){e.delete("/api/defs"+n).success(function(e){return e}).error(function(e){console.log("Error: "+e)})}}}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lbXJ5L21vZHVsZS5qcyIsIm1lbXJ5L2NvbmZpZy9jZmctcm91dGVzLmpzIiwibWVtcnkvY29udHJvbGxlcnMvY3RybC1kZWZfZm9ybS5qcyIsIm1lbXJ5L2NvbnRyb2xsZXJzL2N0cmwtZGVmX2xpc3QuanMiLCJtZW1yeS9jb250cm9sbGVycy9jdHJsLW1haW4uanMiLCJtZW1yeS9zZXJ2aWNlcy9zcnZjLWRlZl9zZXJ2ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsWUFFQSxTQUFBLE9BQUEsU0FBQSxZQ0RBLFFBQUEsT0FBQSxTQUNBLFFBQUEsaUJBQUEsU0FBQSxHQUVBLEVBQ0EsS0FBQSxLQUNBLFlBQUEsdUJDTEEsUUFBQSxPQUFBLFNBQ0EsV0FBQSw0QkFBQSxTQUFBLFlBQUEsU0FBQSxFQUFBLEdBRUEsRUFBQSxpQkFBQSxFQUNBLEVBQUEsWUFBQSxXQVdBLEVBQUEsZ0JBREEsS0FBQSxFQUFBLE9BQ0EsR0FFQSxHQUlBLEVBQUEsZ0JBQUEsYUFJQSxFQUFBLGNBQUEsYUFJQSxFQUFBLGNBQUEsV0FDQSxHQUFBLEVBQUEsT0FBQSxFQUFBLFlBQUEsQ0FDQSxHQUFBLElBQ0EsTUFBQSxFQUFBLE1BQ0EsWUFBQSxFQUFBLFlBR0EsR0FBQSxPQUFBLEdBR0EsRUFBQSxNQUFBLEdBQ0EsRUFBQSxZQUFBLEdBQ0EsRUFBQSxpQkFBQSxPQ3pDQSxRQUFBLE9BQUEsU0FDQSxXQUFBLDRCQUFBLFNBQUEsWUFBQSxTQUFBLEVBQUEsR0FFQSxFQUFBLGVBQUEsU0FBQSxHQUNBLEVBQUEsWUFBQSxRQUFBLFNBQUEsR0FDQSxFQUFBLFVBQUEsSUFFQSxFQUFBLFlBQUEsR0FBQSxVQUFBLEdBR0EsRUFBQSxnQkFBQSxTQUFBLEdBQ0EsRUFBQSxZQUFBLEdBQUEsVUFBQSxHQUlBLEVBQUEsZUFBQSxTQUFBLEVBQUEsR0FDQSxFQUFBLGdCQUFBLEdBR0EsRUFBQSxPQUFBLElBR0EsRUFBQSxjQUFBLFNBQUEsR0FDQSxFQUFBLE9BQUEsT0N2QkEsUUFBQSxPQUFBLFNBQ0EsV0FBQSxpQkFBQSxjQ0RBLFFBQUEsT0FBQSxTQUNBLFFBQUEsYUFBQSxRQUFBLFNBQUEsR0FFQSxPQUNBLE9BQUEsV0FDQSxFQUFBLElBQUEsYUFDQSxRQUFBLFNBQUEsR0FDQSxNQUFBLEtBRUEsTUFBQSxTQUFBLEdBQ0EsUUFBQSxJQUFBLFVBQUEsTUFJQSxPQUFBLFNBQUEsR0FDQSxFQUFBLElBQUEsYUFBQSxHQUNBLFFBQUEsU0FBQSxHQUNBLE1BQUEsS0FFQSxNQUFBLFNBQUEsR0FDQSxRQUFBLElBQUEsVUFBQSxNQUlBLE9BQUEsU0FBQSxHQUNBLEVBQUEsS0FBQSxZQUFBLEdBQ0EsUUFBQSxTQUFBLEdBQ0EsTUFBQSxLQUVBLE1BQUEsU0FBQSxHQUNBLFFBQUEsSUFBQSxVQUFBLE1BSUEsT0FBQSxTQUFBLEdBQ0EsRUFBQSxJQUFBLGFBQUEsRUFBQSxJQUFBLEdBQ0EsUUFBQSxTQUFBLEdBQ0EsTUFBQSxLQUVBLE1BQUEsU0FBQSxHQUNBLFFBQUEsSUFBQSxVQUFBLE1BSUEsU0FBQSxTQUFBLEdBQ0EsRUFBQSxPQUFBLFlBQUEsR0FDQSxRQUFBLFNBQUEsR0FDQSxNQUFBLEtBRUEsTUFBQSxTQUFBLEdBQ0EsUUFBQSxJQUFBLFVBQUEiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypnbG9iYWwgYW5ndWxhciovXG4ndXNlIHN0cmljdCc7XG5cbmFuZ3VsYXIubW9kdWxlKCdtZW1yeScsIFsnbmdSb3V0ZSddKTtcbiIsIi8qZ2xvYmFsIGFuZ3VsYXIqL1xuXG5hbmd1bGFyLm1vZHVsZSgnbWVtcnknKVxuICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICAkcm91dGVQcm92aWRlclxuICAgICAgLndoZW4oJy8nLCB7XG4gICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvbWFpbi5odG1sJ1xuICAgICAgfSk7XG4gIH0pXG47IiwiLypnbG9iYWwgYW5ndWxhciovXG5cbmFuZ3VsYXIubW9kdWxlKCdtZW1yeScpXG4gIC5jb250cm9sbGVyKCdEZWZpbml0aW9uRm9ybUNvbnRyb2xsZXInLCBmdW5jdGlvbiAoJHNjb3BlLCBkZWZTZXJ2ZXIpIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgJHNjb3BlLmhpZGVEZXNjcmlwdGlvbiA9IHRydWU7XG4gICAgJHNjb3BlLnRpdGxlQ2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAvKlxuICAgICAgdmFyIGZvdW5kVGl0bGUgPSAkc2NvcGUuc2Nyb2xsVG9EZWZCeVRpdGxlKCRzY29wZS50aXRsZSk7XG5cbiAgICAgIGlmIChmb3VuZFRpdGxlICE9PSAnJyB8fCAkc2NvcGUudGl0bGUgPT09ICcnKSB7XG4gICAgICAgICRzY29wZS5oaWRlRGVzY3JpcHRpb24gPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJHNjb3BlLmhpZGVEZXNjcmlwdGlvbiA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgKi9cbiAgICAgIGlmICgkc2NvcGUudGl0bGUgPT09ICcnKSB7XG4gICAgICAgICRzY29wZS5oaWRlRGVzY3JpcHRpb24gPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJHNjb3BlLmhpZGVEZXNjcmlwdGlvbiA9IGZhbHNlO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAkc2NvcGUudGl0bGVJbnB1dEJlZ2luID0gZnVuY3Rpb24oKSB7XG4gICAgICAvLyRzY29wZS5jdXJyZW50U2Nyb2xsRGVmSUQgPSBudWxsO1xuICAgIH07XG5cbiAgICAkc2NvcGUudGl0bGVJbnB1dEVuZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgLy8kc2NvcGUuY3VycmVudFNjcm9sbERlZklEID0gbnVsbDtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmFkZERlZmluaXRpb24gPSBmdW5jdGlvbigpe1xuICAgICAgaWYgKCRzY29wZS50aXRsZSAmJiAkc2NvcGUuZGVzY3JpcHRpb24pIHtcbiAgICAgICAgdmFyIGRlZmluaXRpb24gPSB7XG4gICAgICAgICAgdGl0bGU6ICRzY29wZS50aXRsZSxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJHNjb3BlLmRlc2NyaXB0aW9uXG4gICAgICAgIH07XG5cbiAgICAgICAgZGVmU2VydmVyLmNyZWF0ZShkZWZpbml0aW9uKTtcblxuICAgICAgICAvL2JsYW5rIG91dCB0aGUgZm9ybVxuICAgICAgICAkc2NvcGUudGl0bGUgPSAnJztcbiAgICAgICAgJHNjb3BlLmRlc2NyaXB0aW9uID0gJyc7XG4gICAgICAgICRzY29wZS5oaWRlRGVzY3JpcHRpb24gPSB0cnVlO1xuICAgICAgfVxuICAgIH07XG4gIH0pXG47IiwiLypnbG9iYWwgYW5ndWxhciovXG5cbmFuZ3VsYXIubW9kdWxlKCdtZW1yeScpXG4gIC5jb250cm9sbGVyKCdEZWZpbml0aW9uTGlzdENvbnRyb2xsZXInLCBmdW5jdGlvbiAoJHNjb3BlLCBkZWZTZXJ2ZXIpIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgJHNjb3BlLnR1cm5PbkVkaXRNb2RlID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgICRzY29wZS5kZWZpbml0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgZC5lZGl0TW9kZSA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgICAkc2NvcGUuZGVmaW5pdGlvbnNbaW5kZXhdLmVkaXRNb2RlID0gdHJ1ZTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLnR1cm5PZmZFZGl0TW9kZSA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAkc2NvcGUuZGVmaW5pdGlvbnNbaW5kZXhdLmVkaXRNb2RlID0gZmFsc2U7XG4gICAgfTtcblxuICAgIC8vdG9kbyBuZWVkIHRvIGVpdGhlciBwYXNzIGRlZl9pZCBvciBmaW5kIGEgdmVyc2lvbiBvZiAkaW5kZXggdGhhdCB0cmFja3MgdGhlIHVuc29ydGVkIG9yZGVyLiBvciBhbHBoYSBzb3J0IGluIHRoZSBkYXRhYmFzZSAob3IgaW4gdGhlIHJldHJpZXZlZCB2ZXJzaW9uISlcbiAgICAkc2NvcGUuZWRpdERlZmluaXRpb24gPSBmdW5jdGlvbihpbmRleCwgZGVmKSB7XG4gICAgICAkc2NvcGUudHVybk9mZkVkaXRNb2RlKGluZGV4KTtcbiAgICAgIC8vdGVtcG9yYXJpbHkgY2hhbmdlIHRoZSB2aXNpYmxlIGRlc2NyaXB0aW9uIHNvIHRoZXJlJ3MgaW1tZWRpYXRlIHVwZGF0ZSBiZWZvcmUgc2VydmVyIHJlc3BvbmRzXG4gICAgICAvLyRzY29wZS5kZWZpbml0aW9uc1tpbmRleF0uZGVzY3JpcHRpb25VUkwgPSAkc2NvcGUuZGVmaW5pdGlvbnNbaW5kZXhdLmRlc2NyaXB0aW9uO1xuICAgICAgZGVmU2VydmVyLnVwZGF0ZShkZWYpO1xuICAgIH07XG5cbiAgICAkc2NvcGUuZGVsRGVmaW5pdGlvbiA9IGZ1bmN0aW9uKGlkKXtcbiAgICAgIGRlZlNlcnZlci5kZWxldGUoaWQpO1xuICAgIH07XG4gIH0pXG47IiwiLypnbG9iYWwgYW5ndWxhciovXG5cbmFuZ3VsYXIubW9kdWxlKCdtZW1yeScpXG4gIC5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG4gIH0pXG47IiwiLypnbG9iYWwgYW5ndWxhciovXG5cbmFuZ3VsYXIubW9kdWxlKCdtZW1yeScpXG4gIC5mYWN0b3J5KCdkZWZTZXJ2ZXInLCBmdW5jdGlvbiAoJGh0dHApIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgcmV0dXJuIHtcbiAgICAgIGdldEFsbDogZnVuY3Rpb24oKSB7XG4gICAgICAgICRodHRwLmdldCgnL2FwaS9kZWZzJylcbiAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZXJyb3IoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvcjogJyArIGRhdGEpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSxcblxuICAgICAgZ2V0T25lOiBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgJGh0dHAuZ2V0KCcvYXBpL2RlZnMvJyArIGlkKVxuICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5lcnJvcihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yOiAnICsgZGF0YSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9LFxuXG4gICAgICBjcmVhdGU6IGZ1bmN0aW9uIChkZWYpIHtcbiAgICAgICAgJGh0dHAucG9zdCgnL2FwaS9kZWZzJywgZGVmKVxuICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5lcnJvcihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yOiAnICsgZGF0YSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9LFxuXG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkZWYpIHtcbiAgICAgICAgJGh0dHAucHV0KCcvYXBpL2RlZnMvJyArIGRlZi5faWQsIGRlZilcbiAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZXJyb3IoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvcjogJyArIGRhdGEpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSxcblxuICAgICAgZGVsZXRlOiBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgJGh0dHAuZGVsZXRlKCcvYXBpL2RlZnMnICsgaWQpXG4gICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmVycm9yKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3I6ICcgKyBkYXRhKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9KVxuOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==