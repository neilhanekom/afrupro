'use strict';

// Configuring the sites module
angular.module('sites').run(['Menus',
	function(Menus) {
		// Add the sites dropdown item
		// Menus.addMenuItem('topbar', {
		// 	title: 'Sites',
		// 	state: 'sites',
		// 	type: 'dropdown'
		// });

		// // Add the dropdown list item
		// Menus.addSubMenuItem('topbar', 'sites', {
		// 	title: 'List Sites',
		// 	state: 'sites.list'
		// });

		// // Add the dropdown create item
		// Menus.addSubMenuItem('topbar', 'sites', {
		// 	title: 'Create Sites',
		// 	state: 'sites.create'
		// });
	}
]);
