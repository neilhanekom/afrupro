'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication', '$timeout', '$mdDialog', 'Users',
	function($scope, $http, $location, Authentication, $timeout, $mdDialog, Users) {
		$scope.authentication = Authentication;

		// some routing actions

		$scope.createSite = function() {
			$location.path('/sites/create');
		};

		$scope.listUsers = function() {
			$location.path('/users/list');
		};

		// -------- Created Confirmation ---------
		$scope.confirmState = ['true'];

		$scope.showConfirm = function() {
			$scope.confirmState.splice(0, 1, 'true');
		};

		$scope.hideConfirm = function() {
			$scope.confirmState.splice(0, 1, 'false');
		};
		
		 // --------------------------
		

		$scope.signup = function(role) {
			$scope.credentials.roles = [];
			var rolesCount = $scope.credentials.roles.length;
			if (rolesCount >= 1) {
				$scope.credentials.roles.splice(0, rolesCount);
			}
			if (role === 'admin') {
				$scope.credentials.roles.push('admin');
				signup();
			} else if (role === 'guest') {
				$scope.credentials.roles.push('guest');
				signup();
			} else if (role === 'user') {
				$scope.credentials.roles.push('user');
				signup();
			} else if (role === 'sub_user') {
				$scope.credentials.roles.push('sub_user');
				signup();
			}
		};

		 var signup = function() {
			$http.post('/api/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				
				// $scope.authentication.user = response;
				$scope.newUser = response.user;
				$scope.successfulMessage = response.message;
				$scope.showConfirm();

				
				// And redirect to the index page
				
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/api/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/dashboard');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);