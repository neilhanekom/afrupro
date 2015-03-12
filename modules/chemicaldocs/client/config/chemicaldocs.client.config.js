'use strict';

// Configuring the Chemicaldocs module
angular.module('chemicaldocs').run(['Menus',
	function(Menus) {
		// Add the Chemicaldocs dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Chemicaldocs',
			state: 'chemicaldocs',
			type: 'dropdown'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'chemicaldocs', {
			title: 'List Chemicaldocs',
			state: 'chemicaldocs.list'
		});

		// Add the dropdown create item
		Menus.addSubMenuItem('topbar', 'chemicaldocs', {
			title: 'Create Chemicaldoc',
			state: 'chemicaldocs.create'
		});
	}
]);