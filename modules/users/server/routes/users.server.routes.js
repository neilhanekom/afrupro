'use strict';

/**
 * Module dependencies.
 */

// NB! Please remember to bring in a users Policy

var passport = require('passport');

module.exports = function(app) {
	// User Routes
	var users = require('../controllers/users.server.controller');

	// Setting up the users profile api
	app.route('/api/users/me').get(users.me);

	// We are testing this
	app.route('/api/users')
		.get(users.list);
		// .post(users.create);

	app.route('/api/users/:userId').put(users.update);

	
	app.route('/api/users/accounts').delete(users.removeOAuthProvider);
	app.route('/api/users/password').post(users.changePassword);
	app.route('/api/users/picture').post(users.changeProfilePicture);

	// Finish by binding the user middleware
	app.param('userId', users.userByID);



	// // Example of Articles Routes
	// app.route('/api/articles').all(articlesPolicy.isAllowed)
	// 	.get(articles.list)
	// 	.post(articles.create);

	// // Single article routes
	// app.route('/api/articles/:articleId').all(articlesPolicy.isAllowed)
	// 	.get(articles.read)
	// 	.put(articles.update)
	// 	.delete(articles.delete);

	// // Finish by binding the article middleware
	// app.param('articleId', articles.articleByID);
};
