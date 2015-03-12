'use strict';

//Ownerships service used to communicate Ownerships REST endpoints
angular.module('ownerships').factory('Ownerships', ['$resource',
	function($resource) {
		return $resource('api/ownerships/:ownershipId', { ownershipId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);