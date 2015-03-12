'use strict';

angular.module('users').controller('AdminsController', ['$scope', 'Admins',
	function($scope, Admins) {
		

		$scope.find = function() {
			$scope.admins = Admins.query();
		};

	}
]);