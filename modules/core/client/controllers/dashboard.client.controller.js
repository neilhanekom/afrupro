'use strict';

angular.module('core').controller('DashboardController', ['$scope', 'Authentication', 'uiGmapGoogleMapApi', 'roundProgressService', '$timeout',
	function($scope, Authentication, uiGmapGoogleMapApi, roundProgressService, $timeout) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		// Maps ready to load
		uiGmapGoogleMapApi.then(function(maps) {
			var mapOptions = {
	        panControl    : true,
	        zoomControl   : true,
	        scaleControl  : true,
	        mapTypeControl: true,
            scrollwheel   : false,
	        mapTypeId     : maps.MapTypeId.HYBRID
	    };

    	$scope.map = { center: { latitude: -23.881835, longitude: 30.148423 },
    					 zoom: 17,
    					 options: mapOptions };
    	});

    	// Progress Controlls

    		$scope.current =        25;
            $scope.max =            50;
            $scope.uploadCurrent =  0;
            $scope.stroke =         5;
            $scope.radius =         50;
            $scope.isSemi =         false;
            $scope.rounded =        false;
            $scope.currentColor =   '#45ccce';
            $scope.bgColor =        '#eaeaea';
            $scope.iterations =     50;
            $scope.currentAnimation = 'easeOutCubic';

            var random = function(min, max){
                return Math.round(Math.floor(Math.random()*(max-min+1)+min));
            },
            timeout;
            $scope.increment = function(amount){
                $scope.current+=(amount || 1);
            };
            $scope.decrement = function(amount){
                $scope.current-=(amount || 1);
            };
            $scope.start = function(){
                $scope.stop();
                timeout = $timeout(function(){
                    $scope.uploadCurrent+=random(1, 5);
                    if($scope.uploadCurrent < 100){
                        $scope.start();
                    }
                }, random(100, 500));
            };
            $scope.stop = function(){
                $timeout.cancel(timeout);
            };
            $scope.reset = function(){
                $scope.stop();
                $scope.uploadCurrent = 0;
            };
            $scope.animations = [];
            angular.forEach(roundProgressService.animations, function(value, key){
                $scope.animations.push(key);
            });

    	
	}
]);

