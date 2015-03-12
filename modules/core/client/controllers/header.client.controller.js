'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$state', 'Authentication', 'Menus', '$timeout', '$mdSidenav', '$log',
	function($scope, $state, Authentication, Menus, $timeout, $mdSidenav, $log) {

		$scope.toggleLeft = function() {
		    $mdSidenav('left').toggle()
		                      .then(function(){
		                          $log.debug('toggle left is done');
		                      });
		  };

		 // $scope.toggleRight = function() {
		 //    $mdSidenav('right').toggle()
		 //                        .then(function(){
		 //                          $log.debug("toggle RIGHT is done");
		 //                        });
		 //  };
		
		$scope.close = function() {
		    $mdSidenav('left').close()
		                      .then(function(){
		                        $log.debug('close LEFT is done');
		                      });
		  };
		
		// Expose view variables
		$scope.$state = $state;
		$scope.authentication = Authentication;
		

		// Get the topbar menu
		$scope.menu = Menus.getMenu('topbar');
		console.log($scope.menu);

		//toggle profile options menu 
		$scope.collapseProfile = true;
		$scope.toggleProfile = function() {
			$scope.collapseProfile = !$scope.collapseProfile;

		};

		$scope.closeProfile = function() {
			$scope.collapseProfile = true;

		};

		// Toggle the menu items
		$scope.isCollapsed = false;
		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);
