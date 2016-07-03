'use strict';

describe('ViewAutomobileDetails', function() {
  var $httpBackend, $rootScope, $routeParams, createController, authRequestHandler;

  // Set up the module
  beforeEach(module('myApp.viewAutomobileDetails'));
  beforeEach(inject(function($injector) {
    // Set up the mock http service responses
    $httpBackend = $injector.get('$httpBackend');
    // Get hold of a scope (i.e. the root scope)
    $rootScope = $injector.get('$rootScope');
    // Get parameters passed via URL
    $routeParams = $injector.get('$routeParams');
    $routeParams.auto_type = 'Gasoline';
    $routeParams.id = 1;

    // The $controller service is used to create instances of controllers
    var $controller = $injector.get('$controller');
    createController = function() {
      return $controller('ViewAutomobileDetails', {'$scope' : $rootScope, '$routeParams': $routeParams });
    };
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should return an automobile record and its tasks', function() {
    var controller = createController();
    $httpBackend
      .when('GET', 'http://localhost:3001/api/gasoline/1/tasks')
      .respond(200, {
        "gasoline": {
          "id": 1,
          "make": "Mazda",
          "model": "3",
          "year": 1900,
          "odometer_reading": 90002
        },
        "tasks": [{
            "id": 10,
            "name": "air conditioning",
            "description": "test test",
            "suitable_for_gasoline": true,
            "suitable_for_diesel": false,
            "suitable_for_electrical": false,
            "selected": false
          },
          {
            "id": 13,
            "name": "Oil change",
            "description": "Drain old oil, add recommended quantity of 5/40",
            "suitable_for_gasoline": true,
            "suitable_for_diesel": true,
            "suitable_for_electrical": false,
            "selected": false
          }
      ]});
    $httpBackend.flush();
    expect($rootScope.automobile).toBeDefined();
    expect($rootScope.automobile_tasks).toBeDefined();
   });
});

describe('AutoMaintTaskCtrl', function() {
  var $httpBackend, $rootScope, $routeParams, createController, authRequestHandler;

  // avoid the Karma error: Some of your tests did a full page reload!
  var fakeWindow = {
    location: {href: ''}
  }

  // Set up the module
  beforeEach(module('myApp.viewAutomobileDetails'));
  beforeEach(inject(function($injector) {
    // Set up the mock http service responses
    $httpBackend = $injector.get('$httpBackend');
    // Get hold of a scope (i.e. the root scope)
    $rootScope = $injector.get('$rootScope');
    // The $controller service is used to create instances of controllers
    var $controller = $injector.get('$controller');
    createController = function() {
      return $controller('AutoMaintTaskCtrl', {'$scope' : $rootScope, '$window': fakeWindow });
    };
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should connect a list of tasks to an automobile', function() {
    var controller = createController();
    $rootScope.automobile_tasks =
      {automobile_tasks: [
        {id: 10, selected: true},
        {id: 11, selected: true}
      ]};

    $httpBackend
      .when('POST', 'http://localhost:3001/api/gasoline/1/tasks')
      .respond(200, {
        id: 1, 
        make: 'Mazda', 
        model: '3', 
        year: '2013', 
        odometer_reading: '85000',
        created_at: "2016-06-30T18:47:38.638Z",
        updated_at: "2016-06-30T18:47:38.638Z"
       });
    $rootScope.updAutoMaintTasks('Gasoline', 1);
    $httpBackend.flush();
    expect($rootScope.saveMessage).toBe('completed');
   });
});
