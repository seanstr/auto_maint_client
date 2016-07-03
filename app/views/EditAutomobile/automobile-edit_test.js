'use strict';

describe('AutomobileAddController', function() {
  var $httpBackend, $rootScope, createController, authRequestHandler;

  // avoid the Karma error: Some of your tests did a full page reload!
  var fakeWindow = {
    location: {
      href: ''
    }
  }

  // Set up the module
  beforeEach(module('myApp.AutomobileEdit'));
  beforeEach(inject(function($injector) {
    // Set up the mock http service responses
    $httpBackend = $injector.get('$httpBackend');
    // Get hold of a scope (i.e. the root scope)
    $rootScope = $injector.get('$rootScope');
    // The $controller service is used to create instances of controllers
    var $controller = $injector.get('$controller');
    createController = function() {
      return $controller('AutomobileAddController', {'$scope' : $rootScope, '$window': fakeWindow });
    };
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should POST a record', function() {
    var controller = createController();
    $rootScope.addAutoForm = {};
    $rootScope.addAutoForm.fuel_mode = 'Gasoline';
    $rootScope.addAutoForm.make = 'Mazda';
    $rootScope.addAutoForm.model = '3';
    $rootScope.addAutoForm.year = '2013';
    $rootScope.addAutoForm.odometer = '81111';

    $httpBackend
      .when('POST', 'http://localhost:3001/api/gasoline')
      .respond(201, {
        id: 1, 
        make: 'Mazda', 
        model: '3', 
        year: '2013', 
        odometer_reading: '85000',
        created_at: "2016-06-30T18:47:38.638Z",
        updated_at: "2016-06-30T18:47:38.638Z"
       });
    $rootScope.addAutomobile();
    $httpBackend.flush();
    expect($rootScope.saveMessage).toBe('completed');
   });
});

describe('AutomobileEditController', function() {
  var $httpBackend, $rootScope, $routeParams, createController, authRequestHandler;

  // avoid the Karma error: Some of your tests did a full page reload!
  var fakeWindow = {
    location: {href: ''}
  }

  // Set up the module
  beforeEach(module('myApp.AutomobileEdit'));
  beforeEach(inject(function($injector) {
    // Set up the mock http service responses
    $httpBackend = $injector.get('$httpBackend');

    // Get hold of a scope (i.e. the root scope)
    $rootScope = $injector.get('$rootScope');
    $routeParams = $injector.get('$routeParams');
    $routeParams.auto_type = 'Gasoline';
    $routeParams.id = '1';

    // The $controller service is used to create instances of controllers
    var $controller = $injector.get('$controller');
    createController = function() {
      return $controller('AutomobileEditController', {'$scope' : $rootScope, '$window': fakeWindow, '$routeParams': $routeParams });
    };
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should GET an automobile record', function() {
    var controller = createController();
    $httpBackend
      .when('GET', 'http://localhost:3001/api/gasoline/1')
      .respond(200, {
        id: 1, 
        make: 'Mazda', 
        model: '3', 
        year: '2013', 
        odometer_reading: '85000',
        created_at: "2016-06-30T18:47:38.638Z",
        updated_at: "2016-06-30T18:47:38.638Z"
       });
    $httpBackend.flush();
    expect($rootScope.automobile).toBeDefined();
  });

  it('should PUT an automobile', function() {
    var controller = createController();
    $httpBackend.when('GET', 'http://localhost:3001/api/gasoline/1').respond({});

    $rootScope.editAutoForm = {};
    $rootScope.editAutoForm.fuel_mode = 'Gasoline';
    $rootScope.editAutoForm.make = 'Mazda';
    $rootScope.editAutoForm.model = '3';
    $rootScope.editAutoForm.year = '2013';
    $rootScope.editAutoForm.odometer = '81111';

    $httpBackend
      .when('PUT', 'http://localhost:3001/api/gasoline/1')
      .respond(200, {
        id: 1, 
        make: 'Mazda', 
        model: '3', 
        year: '2013', 
        odometer_reading: '85000',
        created_at: "2016-06-30T18:47:38.638Z",
        updated_at: "2016-06-30T18:47:38.638Z"
       });
    $rootScope.updateAutomobile();
    $httpBackend.flush();
    expect($rootScope.automobile).toBeDefined();
   });
});
