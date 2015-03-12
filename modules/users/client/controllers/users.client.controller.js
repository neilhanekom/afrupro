'use strict';

angular.module('users').controller('UsersController', ['$scope', 'Users', '$mdDialog',
	function($scope, Users, $mdDialog) {

		$scope.find = function() {
			$scope.users = Users.query();
		};

		$scope.showAdvanced = function(ev) {
		    $mdDialog.show({
		      controller: DialogController,
		      templateUrl: '/modules/users/views/users/confirm-new-user.client.view.html',
		      targetEvent: ev,
		    });
		    
		};
		function DialogController($scope, $mdDialog) {
		  $scope.hide = function() {
		    $mdDialog.hide();
		  };
		  $scope.cancel = function() {
		    $mdDialog.cancel();
		  };
		  $scope.answer = function(answer) {
		    $mdDialog.hide(answer);
		 };
		}

		
	}
]);