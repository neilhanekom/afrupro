'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('sites').factory('Sites', ['$resource',
	function($resource) {
		return $resource('api/sites/:siteId', {
			sitedId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
