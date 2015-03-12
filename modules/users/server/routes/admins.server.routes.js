'use strict';

module.exports = function(app) {
	

	var admins = require('../controllers/admins.server.controller');

	app.route('/api/admins')
		.get(admins.list);
	
	app.route('/api/admins/:adminId')
		.get(admins.read)
		.put(admins.update)
		.delete(admins.delete);

	app.param( 'adminId' , admins.adminByID);

};