'use strict';

angular.module('myApp',['ngRoute',
		'myApp.viewListAutomobiles',
		'myApp.viewListMaintenanceTasks',
		'myApp.viewAutomobileDetails',
		'myApp.viewMaintenanceTaskDetails',
		'myApp.AutomobileEdit',
		'myApp.MaintenanceTaskEdit',
	])
	.config(['$locationProvider', '$routeProvider', '$httpProvider', function config($locationProvider, $routeProvider, $httpProvider) {
		$locationProvider.hashPrefix('!');
	  $routeProvider.otherwise({redirectTo: '/viewListAutomobiles'});
	  $httpProvider.defaults.useXDomain = true;
		delete $httpProvider.defaults.headers.common["X-Requested-With"]; 
}]);
