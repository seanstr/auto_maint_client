'use strict';

describe('ViewListAutomobilesCtrl', function() {
  var $httpBackend, $rootScope, createController, authRequestHandler;

  // Set up the module
  beforeEach(module('myApp.viewListAutomobiles'));
  beforeEach(inject(function($injector) {
    // Set up the mock http service responses
    $httpBackend = $injector.get('$httpBackend');
    // Get hold of a scope (i.e. the root scope)
    $rootScope = $injector.get('$rootScope');
    // The $controller service is used to create instances of controllers
    var $controller = $injector.get('$controller');
    createController = function() {
      return $controller('ViewListAutomobilesCtrl', {'$scope' : $rootScope });
    };
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should return all automobile records of each auto-type', function() {
    $httpBackend
      .when('GET', 'http://localhost:3001/api/gasoline')
      .respond(200, [
        {"id": 1, "make": "Mazda", "model": "3", "year": 1900, "odometer_reading": 90002},
        {"id": 2, "make": "Buick", "model": "Rendezvous", "year": 2007, "odometer_reading": 80888}
      ]);

    $httpBackend
      .when('GET', 'http://localhost:3001/api/diesel')
      .respond(200, [
        {"id": 3, "make": "Ford", "model": "F150", "year": 2016, "odometer_reading": 20000},
        {"id": 4, "make": "Caterpillar", "model": "2800", "year": 1970, "odometer_reading": 1500 }
      ]);

    $httpBackend
      .when('GET', 'http://localhost:3001/api/electrical')
      .respond(200, [
        {"id": 5, "make": "Tesla", "model": "200", "year": 2016, "odometer_reading": 2},
        {"id": 6, "make": "GM", "model": "Volt", "year": 2015, "odometer_reading": 5}
      ]);
    var controller = createController();
    $httpBackend.flush();

    expect($rootScope.gasoline).toBeDefined();
    expect($rootScope.diesel).toBeDefined();
    expect($rootScope.electric).toBeDefined();
   });

  it('should DELETE an automobile record', function() {
    $httpBackend.when('GET', 'http://localhost:3001/api/gasoline').respond({});
    $httpBackend.when('GET', 'http://localhost:3001/api/diesel').respond({});
    $httpBackend.when('GET', 'http://localhost:3001/api/electrical').respond({});
    var controller = createController();
    $httpBackend.flush();

    $httpBackend
      .when('DELETE', 'http://localhost:3001/api/gasoline/1')
      .respond(200);
    $rootScope.Delete('Gasoline', 1);
    $httpBackend.flush();
    expect($rootScope.saveMessage).toBe('completed');
  });
});

