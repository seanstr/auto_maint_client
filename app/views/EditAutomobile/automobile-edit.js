'use strict';

angular.module('myApp.AutomobileEdit', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/addAutomobile', {
      templateUrl: 'views/EditAutomobile/automobile-add.html',
      controller: 'AutomobileAddController'
    });
  }])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/editAutomobile/:auto_type/:id', {
      templateUrl: 'views/EditAutomobile/automobile-edit.html',
      controller: 'AutomobileEditController'
    });
  }])

  .controller('AutomobileAddController', ['$scope', '$http', '$routeParams', '$window', function($scope, $http, $routeParams, $window) {
    $scope.addAutomobile = function() {
      if (angular.isDefined($scope.addAutoForm.fuel_mode)) {
        var auto_type = $scope.addAutoForm.fuel_mode.toLowerCase();
        if (auto_type == 'electric') auto_type = 'electrical'; 

        var params = {
          make: $scope.addAutoForm.make,
          model: $scope.addAutoForm.model,
          year: $scope.addAutoForm.year,
          odometer_reading: $scope.addAutoForm.odometer
        };
        $http.post('http://localhost:3001/api/' + auto_type, params)
          .then(function(response) {
            $scope.saveMessage = "completed";
            $window.location.href = '/#!/viewListAutomobiles';
        });
      }
    };
  }])

  .controller('AutomobileEditController', ['$scope', '$http', '$routeParams', '$window', function($scope, $http, $routeParams, $window) {
    $scope.loadAutomobile = function() {
      var original_auto_type = $routeParams.auto_type;
      var auto_type = $routeParams.auto_type.toLowerCase();
      if (auto_type == 'electric') auto_type = 'electrical'; 
      $http.get('http://localhost:3001/api/' + auto_type + '/' + $routeParams.id)
      .then(function(response) {
        $scope.automobile = response.data;
        $scope.automobile.fuel_mode = original_auto_type;
      });
    };
    $scope.loadAutomobile();

    $scope.updateAutomobile = function() {
      var params = {}
      var auto_type = $scope.editAutoForm.fuel_mode.toLowerCase();
      if ($scope.editAutoForm.make) angular.extend(params, {make: $scope.editAutoForm.make});
      if ($scope.editAutoForm.model) angular.extend(params, {model: $scope.editAutoForm.model});
      if ($scope.editAutoForm.year) angular.extend(params, {year: $scope.editAutoForm.year});
      if ($scope.editAutoForm.odometer) angular.extend(params, {odometer_reading: $scope.editAutoForm.odometer});
      $http.put('http://localhost:3001/api/' + auto_type + '/' + $routeParams.id, {"automobile": params})
        .then(function(response) {
          $window.location.href = '/#!/viewListAutomobiles'; //redirect to home
      });
    };
  }])
