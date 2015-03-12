'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('users').factory('Admins', ['$resource',
	function($resource) {
		return $resource('api/admins/:userId', {
			userId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);