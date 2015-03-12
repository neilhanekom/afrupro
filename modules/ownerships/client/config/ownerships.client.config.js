'use strict';

// Configuring the Ownerships module
angular.module('ownerships').run(['Menus',
	function(Menus) {
		// Add the Ownerships dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Ownerships',
			state: 'ownerships',
			type: 'dropdown'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'ownerships', {
			title: 'List Ownerships',
			state: 'ownerships.list'
		});

		// Add the dropdown create item
		Menus.addSubMenuItem('topbar', 'ownerships', {
			title: 'Create Ownership',
			state: 'ownerships.create'
		});
	}
]);