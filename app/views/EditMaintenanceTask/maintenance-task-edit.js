'use strict';

angular.module('myApp.MaintenanceTaskEdit', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/addMaintenanceTask', {
      templateUrl: 'views/EditMaintenanceTask/maintenance-task-add.html',
      controller: 'MaintenanceTaskAddController'
    });
  }])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/editMaintenanceTask/:id', {
      templateUrl: 'views/EditMaintenanceTask/maintenance-task-edit.html',
      controller: 'MaintenanceTaskEditController'
    });
  }])

  .controller('MaintenanceTaskAddController', ['$scope', '$http', '$routeParams', '$window', function($scope, $http, $routeParams, $window) {
    $scope.addMaintenanceTask = function() {
      var params = {
        name: $scope.maintenance_task.name,
        description: $scope.maintenance_task.description,
        suitable_for_gasoline: $scope.maintenance_task.suitable_for_gasoline,
        suitable_for_diesel: $scope.maintenance_task.suitable_for_diesel,
        suitable_for_electrical: $scope.maintenance_task.suitable_for_electrical
      };
      $http.post('http://localhost:3001/api/maintenance_tasks', params)
        .then(function(response) {
          $scope.saveMessage = 'completed';
          $window.location.href = '/#!/viewListMaintenanceTasks'; //redirect to home
      });
    };
  }])

  .controller('MaintenanceTaskEditController', ['$scope', '$http', '$routeParams', '$window', function($scope, $http, $routeParams, $window) {
    $scope.loadMaintenanceTask = function() {
      $http.get('http://localhost:3001/api/maintenance_tasks/' + $routeParams.id)
      .then(function(response) {
        $scope.maintenance_task = response.data;
      });
    };
    $scope.loadMaintenanceTask();

    $scope.updateMaintenanceTask = function() {
      var params = {
        name: $scope.name,
        description: $scope.maintenance_task.description,
        suitable_for_gasoline: $scope.maintenance_task.suitable_for_gasoline,
        suitable_for_diesel: $scope.maintenance_task.suitable_for_diesel,
        suitable_for_electrical: $scope.maintenance_task.suitable_for_electrical
      };
      $http.put('http://localhost:3001/api/maintenance_tasks/' + $routeParams.id, {"maintenance_task": params})
        .then(function(response) { 
          $scope.saveMessage = 'completed';
          $window.location.href = '/#!/viewListMaintenanceTasks'; //redirect to home
        });
    };
  }]);
  
