'use strict';

//Chemicaldocs service used to communicate Chemicaldocs REST endpoints
angular.module('chemicaldocs').factory('Chemicaldocs', ['$resource',
	function($resource) {
		return $resource('api/chemicaldocs/:chemicaldocId', { chemicaldocId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);