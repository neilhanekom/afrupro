'use strict';

// Users module config
angular.module('users').run(['Menus',
	function(Menus) {
		// Menus.addMenuItem('topbar', {
		// 	title: 'Articles',
		// 	state: 'articles',
		// 	type: 'dropdown'
		// });

		// // Add the dropdown list item
		// Menus.addSubMenuItem('topbar', 'articles', {
		// 	title: 'List Articles',
		// 	state: 'articles.list'
		// });

		// // Add the dropdown create item
		// Menus.addSubMenuItem('topbar', 'articles', {
		// 	title: 'Create Articles',
		// 	state: 'articles.create'
		// });
	}
]);