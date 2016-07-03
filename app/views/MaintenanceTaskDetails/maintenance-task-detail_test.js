'use strict';

describe('ViewMaintenanceTaskDetails', function() {
  var $httpBackend, $rootScope, $routeParams, createController, authRequestHandler;

  // Set up the module
  beforeEach(module('myApp.viewMaintenanceTaskDetails'));
  beforeEach(inject(function($injector) {
    // Set up the mock http service responses
    $httpBackend = $injector.get('$httpBackend');
    // Get hold of a scope (i.e. the root scope)
    $rootScope = $injector.get('$rootScope');
    // Get parameters passed via URL
    $routeParams = $injector.get('$routeParams');
    $routeParams.id = 1;

    // The $controller service is used to create instances of controllers
    var $controller = $injector.get('$controller');
    createController = function() {
      return $controller('ViewMaintenanceTaskDetails', {'$scope' : $rootScope, '$routeParams': $routeParams });
    };
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should return a single maintenance_task record', function() {
    var controller = createController();
    $httpBackend
      .when('GET', 'http://localhost:3001/api/maintenance_tasks/1')
      .respond(200, {
        "id": 10,
        "name": "air conditioning",
        "description": "test test",
        "suitable_for_gasoline": true,
        "suitable_for_diesel": false,
        "suitable_for_electrical": false,
        "selected": false
      }
    );
    $httpBackend.flush();
    expect($rootScope.maintenance_task).toBeDefined();
   });
});
