'use strict';

describe('MaintenanceTaskAddController', function() {
  var $httpBackend, $rootScope, $window, createController, authRequestHandler;

  // avoid the Karma error: Some of your tests did a full page reload!
  var fakeWindow = {
    location: {
      href: ''
    }
  }

  // Set up the module
  beforeEach(module('myApp.MaintenanceTaskEdit'));
  beforeEach(inject(function($injector) {
    // Set up the mock http service responses
    $httpBackend = $injector.get('$httpBackend');
    // Get hold of a scope (i.e. the root scope)
    $rootScope = $injector.get('$rootScope');
    // The $controller service is used to create instances of controllers
    var $controller = $injector.get('$controller');
    createController = function() {
      return $controller('MaintenanceTaskAddController', {'$scope' : $rootScope, '$window': fakeWindow });
    };
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should POST a record', function() {
    var controller = createController();
    $rootScope.maintenance_task = {};
    $rootScope.maintenance_task.name = 'Oil Change';
    $rootScope.maintenance_task.description = 'Oil Change';
    $rootScope.maintenance_task.suitable_for_gasoline = true;
    $rootScope.maintenance_task.suitable_for_diesel = true;
    $rootScope.maintenance_task.suitable_for_electrical = false;

    $httpBackend
      .when('POST', 'http://localhost:3001/api/maintenance_tasks')
      .respond(201, {
        name: 'Oil Change',
        description: 'Oil Change',
        suitable_for_gasoline: true,
        suitable_for_diesel: true,
        suitable_for_electrical: false,
        created_at: "2016-06-30T18:47:38.638Z",
        updated_at: "2016-06-30T18:47:38.638Z"
       });
    $rootScope.addMaintenanceTask();
    $httpBackend.flush();
    expect($rootScope.saveMessage).toBe('completed');
   });
});

describe('MaintenanceTaskEditController', function() {
  var $httpBackend, $rootScope, $routeParams, createController, authRequestHandler;

  // avoid the Karma error: Some of your tests did a full page reload!
  var fakeWindow = {
    location: {href: ''}
  }

  // Set up the module
  beforeEach(module('myApp.MaintenanceTaskEdit'));
  beforeEach(inject(function($injector) {
    // Set up the mock http service responses
    $httpBackend = $injector.get('$httpBackend');

    // Get hold of a scope (i.e. the root scope)
    $rootScope = $injector.get('$rootScope');
    $routeParams = $injector.get('$routeParams');
    $routeParams.id = '1';

    // The $controller service is used to create instances of controllers
    var $controller = $injector.get('$controller');
    createController = function() {
      return $controller('MaintenanceTaskEditController', {'$scope' : $rootScope, '$window': fakeWindow, '$routeParams': $routeParams });
    };
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should GET a task maintenance record', function() {
    var controller = createController();
    $httpBackend
      .when('GET', 'http://localhost:3001/api/maintenance_tasks/1')
      .respond(200, {
        name: 'Oil Change',
        description: 'Oil Change',
        suitable_for_gasoline: true,
        suitable_for_diesel: true,
        suitable_for_electrical: false,
        created_at: "2016-06-30T18:47:38.638Z",
        updated_at: "2016-06-30T18:47:38.638Z"
       });
    $httpBackend.flush();
    expect($rootScope.maintenance_task).toBeDefined();
  });

  it('should PUT a maintenance_task', function() {
    var controller = createController();
    $httpBackend.when('GET', 'http://localhost:3001/api/maintenance_tasks/1').respond({});

    $rootScope.maintenance_task = {};
    $rootScope.name = 'Oil Change';
    $rootScope.maintenance_task.description = 'Oil Change';
    $rootScope.maintenance_task.suitable_for_gasoline = true;
    $rootScope.maintenance_task.suitable_for_diesel = true;
    $rootScope.maintenance_task.suitable_for_electrical = false;

    $httpBackend
      .when('PUT', 'http://localhost:3001/api/maintenance_tasks/1')
      .respond(200, {
        name: 'Oil Change',
        description: 'Oil Change',
        suitable_for_gasoline: true,
        suitable_for_diesel: true,
        suitable_for_electrical: false,
        created_at: "2016-06-30T18:47:38.638Z",
        updated_at: "2016-06-30T18:47:38.638Z"
       });
    $rootScope.updateMaintenanceTask();
    $httpBackend.flush();
    expect($rootScope.saveMessage).toBe('completed');
   });
});
