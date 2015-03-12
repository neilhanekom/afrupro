'use strict';

(function() {
	// Ownerships Controller Spec
	describe('Ownerships Controller Tests', function() {
		// Initialize global variables
		var OwnershipsController,
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

			// Initialize the Ownerships controller.
			OwnershipsController = $controller('OwnershipsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Ownership object fetched from XHR', inject(function(Ownerships) {
			// Create sample Ownership using the Ownerships service
			var sampleOwnership = new Ownerships({
				name: 'New Ownership'
			});

			// Create a sample Ownerships array that includes the new Ownership
			var sampleOwnerships = [sampleOwnership];

			// Set GET response
			$httpBackend.expectGET('api/ownerships').respond(sampleOwnerships);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.ownerships).toEqualData(sampleOwnerships);
		}));

		it('$scope.findOne() should create an array with one Ownership object fetched from XHR using a ownershipId URL parameter', inject(function(Ownerships) {
			// Define a sample Ownership object
			var sampleOwnership = new Ownerships({
				name: 'New Ownership'
			});

			// Set the URL parameter
			$stateParams.ownershipId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/api\/ownerships\/([0-9a-fA-F]{24})$/).respond(sampleOwnership);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.ownership).toEqualData(sampleOwnership);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Ownerships) {
			// Create a sample Ownership object
			var sampleOwnershipPostData = new Ownerships({
				name: 'New Ownership'
			});

			// Create a sample Ownership response
			var sampleOwnershipResponse = new Ownerships({
				_id: '525cf20451979dea2c000001',
				name: 'New Ownership'
			});

			// Fixture mock form input values
			scope.name = 'New Ownership';

			// Set POST response
			$httpBackend.expectPOST('api/ownerships', sampleOwnershipPostData).respond(sampleOwnershipResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Ownership was created
			expect($location.path()).toBe('/ownerships/' + sampleOwnershipResponse._id);
		}));

		it('$scope.update() should update a valid Ownership', inject(function(Ownerships) {
			// Define a sample Ownership put data
			var sampleOwnershipPutData = new Ownerships({
				_id: '525cf20451979dea2c000001',
				name: 'New Ownership'
			});

			// Mock Ownership in scope
			scope.ownership = sampleOwnershipPutData;

			// Set PUT response
			$httpBackend.expectPUT(/api\/ownerships\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/ownerships/' + sampleOwnershipPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid ownershipId and remove the Ownership from the scope', inject(function(Ownerships) {
			// Create new Ownership object
			var sampleOwnership = new Ownerships({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Ownerships array and include the Ownership
			scope.ownerships = [sampleOwnership];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/api\/ownerships\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleOwnership);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.ownerships.length).toBe(0);
		}));
	});
}());