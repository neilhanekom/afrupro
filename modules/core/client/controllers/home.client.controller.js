'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'uiGmapGoogleMapApi',
	function($scope, Authentication, uiGmapGoogleMapApi) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		// Maps ready to load
		uiGmapGoogleMapApi.then(function(maps) {
			var mapOptions = {
	        panControl    : true,
	        zoomControl   : true,
	        scaleControl  : true,
	        mapTypeControl: true,
	        mapTypeId     : maps.MapTypeId.HYBRID
	    };

    	$scope.map = { center: { latitude: -23.744983, longitude: 30.150450 },
    					 zoom: 16,
    					 options: mapOptions };
    	});

    	// Add more controlling code here

    	
    	
	}
]);