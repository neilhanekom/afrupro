'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function ($stateProvider) {
		// Users state routing
		$stateProvider.
			state('settings', {
				abstract: true,
				url: '/settings',
				templateUrl: 'modules/users/views/settings/settings.client.view.html'
			}).
			state('settings.profile', {
				url: '/profile',
				templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
			}).
			state('settings.password', {
				url: '/password',
				templateUrl: 'modules/users/views/settings/change-password.client.view.html'
			}).
			state('settings.accounts', {
				url: '/accounts',
				templateUrl: 'modules/users/views/settings/manage-social-accounts.client.view.html'
			}).
			state('settings.picture', {
				url: '/picture',
				templateUrl: 'modules/users/views/settings/change-profile-picture.client.view.html'
			}).
			state('authentication', {
				abstract: true,
				url: '/authentication',
				templateUrl: 'modules/users/views/authentication/authentication.client.view.html'
			}).
			// Here we are going to specify a few routes
			state('authentication.signup', {
				abstract: true,
				url: '/signup',
				template: '<ui-view/>'
			}).
			state('authentication.signup.user', {
				url: '/user',
				templateUrl: 'modules/users/views/authentication/signup/user.client.view.html'
			}).
			state('authentication.signup.admin', {
				url: '/admin',
				templateUrl: 'modules/users/views/authentication/signup/admin.client.view.html'
			}).
			state('authentication.signup.guest', {
				url: '/guest',
				templateUrl: 'modules/users/views/authentication/signup/guest.client.view.html'
			}).
			state('authentication.signin', {
				url: '/signin',
				templateUrl: 'modules/users/views/authentication/signin.client.view.html'
			}).
			state('password', {
				abstract: true,
				url: '/password',
				template: '<ui-view/>'
			}).
			state('password.forgot', {
				url: '/forgot',
				templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
			}).
			state('password.reset', {
				abstract: true,
				url: '/reset',
				template: '<ui-view/>'
			}).
			state('password.reset.invalid', {
				url: '/invalid',
				templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
			}).
			state('password.reset.success', {
				url: '/success',
				templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
			}).
			state('password.reset.form', {
				url: '/:token',
				templateUrl: 'modules/users/views/password/reset-password.client.view.html'
			}).
			state('users', {
				abstract: true,
				url: '/users',
				template: '<ui-view/>'
			}).
			state('users.list', {
				url: '/list',
				templateUrl: 'modules/users/views/users/list-users.client.view.html'
			}).
			state('users.create', {
				url: '/create',
				templateUrl: 'modules/articles/views/create-article.client.view.html'
			}).
			state('users.view', {
				url: '/:userId',
				templateUrl: 'modules/articles/views/view-article.client.view.html'
			}).
			state('users.edit', {
				url: '/:userId/edit',
				templateUrl: 'modules/articles/views/edit-article.client.view.html'
			}).
			state('guests', {
				abstract: true,
				url: '/guests',
				template: '<ui-view/>'
			}).
			state('guests.list', {
				url: '',
				templateUrl: 'modules/users/views/guests/list-guests.client.view.html'
			}).
			state('guests.create', {
				url: '/create',
				templateUrl: 'modules/articles/guests/create-guest.client.view.html'
			}).
			state('guests.view', {
				url: '/:userId',
				templateUrl: 'modules/articles/guests/view-guest.client.view.html'
			}).
			state('guests.edit', {
				url: '/:userId/edit',
				templateUrl: 'modules/articles/guests/edit-guest.client.view.html'
			}).
			state('admins', {
				abstract: true,
				url: '/admins',
				template: '<ui-view/>'
			}).
			state('admins.list', {
				url: '',
				templateUrl: 'modules/users/views/admins/list-admins.client.view.html'
			}).
			state('admin.create', {
				url: '/create',
				templateUrl: 'modules/articles/admins/create-admin.client.view.html'
			}).
			state('admins.view', {
				url: '/:userId',
				templateUrl: 'modules/articles/admins/view-admin.client.view.html'
			}).
			state('admins.edit', {
				url: '/:userId/edit',
				templateUrl: 'modules/articles/admins/edit-admin.client.view.html'
			})
			;	

	}
]);
