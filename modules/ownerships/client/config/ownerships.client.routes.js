'use strict';

//Setting up route
angular.module('ownerships').config(['$stateProvider',
	function($stateProvider) {
		// Ownerships state routing
		$stateProvider.
		state('ownerships', {
			abstract: true,
			url: '/ownerships',
			template: '<ui-view/>'
		}).
		state('ownerships.list', {
			url: '',
			templateUrl: 'modules/ownerships/views/list-ownerships.client.view.html'
		}).
		state('ownerships.create', {
			url: '/create',
			templateUrl: 'modules/ownerships/views/create-ownership.client.view.html'
		}).
		state('ownerships.view', {
			url: '/:ownershipId',
			templateUrl: 'modules/ownerships/views/view-ownership.client.view.html'
		}).
		state('ownerships.edit', {
			url: '/:ownershipId/edit',
			templateUrl: 'modules/ownerships/views/edit-ownership.client.view.html'
		});
	}
]);