'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider', 
	function($stateProvider, $urlRouterProvider ) {
		// Material Theming
		
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('dashboard', {
			url: '/dashboard',
			templateUrl: 'modules/core/views/dashboard.client.view.html'
		}).
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		}).
		state('features', {
			url: '/features',
			templateUrl: 'modules/core/views/features.client.view.html'
		}).
		state('about', {
			url: '/about',
			templateUrl: 'modules/core/views/about.client.view.html'
		});
	}
]);