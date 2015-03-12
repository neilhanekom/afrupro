'use strict';

// Ownerships controller
angular.module('ownerships').controller('OwnershipsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Ownerships',
	function($scope, $stateParams, $location, Authentication, Ownerships ) {
		$scope.authentication = Authentication;

		// Create new Ownership
		$scope.create = function() {
			// Create new Ownership object
			var ownership = new Ownerships ({
				name: this.name
			});

			// Redirect after save
			ownership.$save(function(response) {
				$location.path('ownerships/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Ownership
		$scope.remove = function( ownership ) {
			if ( ownership ) { ownership.$remove();

				for (var i in $scope.ownerships ) {
					if ($scope.ownerships [i] === ownership ) {
						$scope.ownerships.splice(i, 1);
					}
				}
			} else {
				$scope.ownership.$remove(function() {
					$location.path('ownerships');
				});
			}
		};

		// Update existing Ownership
		$scope.update = function() {
			var ownership = $scope.ownership ;

			ownership.$update(function() {
				$location.path('ownerships/' + ownership._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Ownerships
		$scope.find = function() {
			$scope.ownerships = Ownerships.query();
		};

		// Find existing Ownership
		$scope.findOne = function() {
			$scope.ownership = Ownerships.get({ 
				ownershipId: $stateParams.ownershipId
			});
		};
	}
]);