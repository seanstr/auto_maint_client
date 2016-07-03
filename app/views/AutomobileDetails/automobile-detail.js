'use strict';

angular.module('myApp.viewAutomobileDetails', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.when('/viewAutomobileDetails/:auto_type/:id', {
	    templateUrl: 'views/AutomobileDetails/automobile-detail.html',
	    controller: 'ViewAutomobileDetails'
	  });
	}])

  .controller('ViewAutomobileDetails', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
  	var original_auto_type = $routeParams.auto_type;
  	var auto_type = $routeParams.auto_type.toLowerCase();
  	if (auto_type == 'electric') auto_type = 'electrical'; 
	  $http.get('http://localhost:3001/api/' + auto_type + '/' + $routeParams.id + "/tasks")
	  	.then(function(response) {
		    $scope.automobile = response.data[auto_type];
		    $scope.automobile_tasks = response.data["tasks"];
		  	$scope.auto_type = original_auto_type;
	  });
  }]);

angular.module('myApp.viewAutomobileDetails')
  .controller('AutoMaintTaskCtrl', ['$scope', '$http', '$location', '$window', function($scope, $http, $location, $window) {
    $scope.updAutoMaintTasks = function(fuel_mode, automobile_id) {
      var upd_array = [];
      angular.forEach($scope.automobile_tasks, function (task) {
        if (task.selected) upd_array.push(task.id);
      });

      if (fuel_mode == 'Electric') fuel_mode = 'Electrical';
      $http.post('http://localhost:3001/api/' + fuel_mode.toLowerCase() + '/' + automobile_id + "/tasks", {"maintenance_tasks" : upd_array})
		  	.then(function(response) {
          $scope.saveMessage = "completed";
					$window.location.href = '/#!/viewListAutomobiles';
		  });
    };
  }]);
