'use strict';

// Setting up route
angular.module('sites').config(['$stateProvider',
	function($stateProvider) {
		// sites state routing
		$stateProvider.
		state('sites', {
			abstract: true,
			url: '/sites',
			template: '<ui-view/>'
		}).
		state('sites.list', {
			url: '',
			templateUrl: 'modules/sites/views/list-sites.client.view.html'
		}).
		state('sites.create', {
			url: '/create',
			templateUrl: 'modules/sites/views/create-site.client.view.html'
		}).
		state('sites.view', {
			url: '/:siteId',
			templateUrl: 'modules/sites/views/view-site.client.view.html'
		}).
		state('sites.edit', {
			url: '/:siteId/edit',
			templateUrl: 'modules/sites/views/edit-site.client.view.html'
		});
	}
]);
