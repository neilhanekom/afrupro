'use strict';

// Core module config
angular.module('core').config(['uiGmapGoogleMapApiProvider',
		function(uiGmapGoogleMapApiProvider) {
			uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
	}
]);