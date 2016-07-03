'use strict';

describe('ViewListMaintenanceTasksCtrl', function() {
  var $httpBackend, $rootScope, createController, authRequestHandler;

  // Set up the module
  beforeEach(module('myApp.viewListMaintenanceTasks'));
  beforeEach(inject(function($injector) {
    // Set up the mock http service responses
    $httpBackend = $injector.get('$httpBackend');
    // Get hold of a scope (i.e. the root scope)
    $rootScope = $injector.get('$rootScope');
    // The $controller service is used to create instances of controllers
    var $controller = $injector.get('$controller');
    createController = function() {
      return $controller('ViewListMaintenanceTasksCtrl', {'$scope' : $rootScope });
    };
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should return all maintenance_task records', function() {
    var controller = createController();
    $httpBackend
      .when('GET', 'http://localhost:3001/api/maintenance_tasks')
      .respond(200, [{
        "id": 10,
        "name": "air conditioning",
        "description": "test test",
        "suitable_for_gasoline": true,
        "suitable_for_diesel": false,
        "suitable_for_electrical": false
      },
      {
        "id": 13,
        "name": "Oil change",
        "description": "Drain old oil, add recommended quantity of 5/40",
        "suitable_for_gasoline": true,
        "suitable_for_diesel": true,
        "suitable_for_electrical": false
    }]);
    $httpBackend.flush();
    expect($rootScope.maintenance_tasks).toBeDefined();
   });

  it('should DELETE a maintenance_task', function() {
    var controller = createController();
    $httpBackend.when('GET', 'http://localhost:3001/api/maintenance_tasks').respond({});
    $httpBackend.flush();

    $httpBackend
      .when('DELETE', 'http://localhost:3001/api/maintenance_tasks/1')
      .respond(200);
    $rootScope.Delete(1);
    $httpBackend.flush();
    expect($rootScope.saveMessage).toBe('completed');
  });
});

