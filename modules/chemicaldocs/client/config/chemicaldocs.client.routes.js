'use strict';

//Setting up route
angular.module('chemicaldocs').config(['$stateProvider',
	function($stateProvider) {
		// Chemicaldocs state routing
		$stateProvider.
		state('chemicaldocs', {
			abstract: true,
			url: '/chemicaldocs',
			template: '<ui-view/>'
		}).
		state('chemicaldocs.list', {
			url: '',
			templateUrl: 'modules/chemicaldocs/views/list-chemicaldocs.client.view.html'
		}).
		state('chemicaldocs.create', {
			url: '/create',
			templateUrl: 'modules/chemicaldocs/views/create-chemicaldoc.client.view.html'
		}).
		state('chemicaldocs.view', {
			url: '/:chemicaldocId',
			templateUrl: 'modules/chemicaldocs/views/view-chemicaldoc.client.view.html'
		}).
		state('chemicaldocs.edit', {
			url: '/:chemicaldocId/edit',
			templateUrl: 'modules/chemicaldocs/views/edit-chemicaldoc.client.view.html'
		});
	}
]);