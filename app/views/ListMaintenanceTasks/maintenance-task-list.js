'use strict';

angular.module('myApp.viewListMaintenanceTasks', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.when('/viewListMaintenanceTasks', {
	    templateUrl: 'views/ListMaintenanceTasks/maintenance-task-list.html',
	    controller: 'ViewListMaintenanceTasksCtrl'
	  });
	}])

	.controller('ViewListMaintenanceTasksCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {
	  $scope.automobileTitle = 'Automobiles';
	  $scope.maintTaskTitle = 'Maintenance Tasks';

	  $http.get('http://localhost:3001/api/maintenance_tasks')
	  	.then(function(response) {
		    $scope.maintenance_tasks = response.data;
	  });

    $scope.Delete = function (id) {
      $http.delete('http://localhost:3001/api/maintenance_tasks/' + id)
		  	.then(function(response) {
		  		$scope.saveMessage = 'completed';
        	$window.location.href = '/#!/viewListMaintenanceTasks';
		  });
    };
	}]);
