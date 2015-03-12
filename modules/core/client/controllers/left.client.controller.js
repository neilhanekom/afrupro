'use strict';

angular.module('core').controller('LeftController', ['$scope', '$timeout', '$mdSidenav', '$log', 'Menus', 'Authentication',
	function($scope, $timeout, $mdSidenav, $log, Menus , Authentication ) {

		$scope.authentication = Authentication;
		 $scope.sidenav = Menus.getMenu('sidenav');
		
		$scope.close = function() {
		    $mdSidenav('left').close()
		                      .then(function(){
		                        $log.debug('close LEFT is done');
		                      });
		  };

	}
]);