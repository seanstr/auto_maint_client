'use strict';

angular.module('myApp.viewMaintenanceTaskDetails', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.when('/viewMaintenanceTaskDetails/:id', {
	    templateUrl: 'views/MaintenanceTaskDetails/maintenance-task-detail.html',
	    controller: 'ViewMaintenanceTaskDetails'
	  });
	}])

  .controller('ViewMaintenanceTaskDetails', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
  	$http.get('http://localhost:3001/api/maintenance_tasks/' + $routeParams.id)
  		.then(function(response) {
	    	$scope.maintenance_task = response.data;
  	});

  }]);
