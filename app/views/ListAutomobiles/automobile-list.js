'use strict';

angular.module('myApp.viewListAutomobiles', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.when('/viewListAutomobiles', {
	    templateUrl: 'views/ListAutomobiles/automobile-list.html',
	    controller: 'ViewListAutomobilesCtrl'
	  });
	}])

	.controller('ViewListAutomobilesCtrl', ['$scope','$http', '$window', function($scope,$http, $window) {
	  $scope.automobileTitle = 'Automobiles';
	  $scope.maintTaskTitle = 'Maintenance Tasks';

	  $http.get('http://localhost:3001/api/gasoline')
	  	.then(function(response) {
		    $scope.gasoline = response.data;
	  });
	  $http.get('http://localhost:3001/api/diesel')
	  	.then(function(response) {
		    $scope.diesel = response.data;
	  });
	  $http.get('http://localhost:3001/api/electrical')
	  	.then(function(response) {
		    $scope.electric = response.data;
	  });

    $scope.Delete = function (fuel_mode, id) {
	    if (fuel_mode == 'Electric') fuel_mode = 'Electrical';
      $http.delete('http://localhost:3001/api/' + fuel_mode.toLowerCase() + '/' + id)
		  	.then(function(response) {
		  		$scope.saveMessage = 'completed';
        	$window.location.href = '/#!/viewListAutomobiles'; //redirect to home
		  });
  	};
	}]);
