'use strict';

(function() {
	// Chemicaldocs Controller Spec
	describe('Chemicaldocs Controller Tests', function() {
		// Initialize global variables
		var ChemicaldocsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Chemicaldocs controller.
			ChemicaldocsController = $controller('ChemicaldocsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Chemicaldoc object fetched from XHR', inject(function(Chemicaldocs) {
			// Create sample Chemicaldoc using the Chemicaldocs service
			var sampleChemicaldoc = new Chemicaldocs({
				name: 'New Chemicaldoc'
			});

			// Create a sample Chemicaldocs array that includes the new Chemicaldoc
			var sampleChemicaldocs = [sampleChemicaldoc];

			// Set GET response
			$httpBackend.expectGET('api/chemicaldocs').respond(sampleChemicaldocs);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.chemicaldocs).toEqualData(sampleChemicaldocs);
		}));

		it('$scope.findOne() should create an array with one Chemicaldoc object fetched from XHR using a chemicaldocId URL parameter', inject(function(Chemicaldocs) {
			// Define a sample Chemicaldoc object
			var sampleChemicaldoc = new Chemicaldocs({
				name: 'New Chemicaldoc'
			});

			// Set the URL parameter
			$stateParams.chemicaldocId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/api\/chemicaldocs\/([0-9a-fA-F]{24})$/).respond(sampleChemicaldoc);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.chemicaldoc).toEqualData(sampleChemicaldoc);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Chemicaldocs) {
			// Create a sample Chemicaldoc object
			var sampleChemicaldocPostData = new Chemicaldocs({
				name: 'New Chemicaldoc'
			});

			// Create a sample Chemicaldoc response
			var sampleChemicaldocResponse = new Chemicaldocs({
				_id: '525cf20451979dea2c000001',
				name: 'New Chemicaldoc'
			});

			// Fixture mock form input values
			scope.name = 'New Chemicaldoc';

			// Set POST response
			$httpBackend.expectPOST('api/chemicaldocs', sampleChemicaldocPostData).respond(sampleChemicaldocResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Chemicaldoc was created
			expect($location.path()).toBe('/chemicaldocs/' + sampleChemicaldocResponse._id);
		}));

		it('$scope.update() should update a valid Chemicaldoc', inject(function(Chemicaldocs) {
			// Define a sample Chemicaldoc put data
			var sampleChemicaldocPutData = new Chemicaldocs({
				_id: '525cf20451979dea2c000001',
				name: 'New Chemicaldoc'
			});

			// Mock Chemicaldoc in scope
			scope.chemicaldoc = sampleChemicaldocPutData;

			// Set PUT response
			$httpBackend.expectPUT(/api\/chemicaldocs\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/chemicaldocs/' + sampleChemicaldocPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid chemicaldocId and remove the Chemicaldoc from the scope', inject(function(Chemicaldocs) {
			// Create new Chemicaldoc object
			var sampleChemicaldoc = new Chemicaldocs({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Chemicaldocs array and include the Chemicaldoc
			scope.chemicaldocs = [sampleChemicaldoc];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/api\/chemicaldocs\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleChemicaldoc);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.chemicaldocs.length).toBe(0);
		}));
	});
}());