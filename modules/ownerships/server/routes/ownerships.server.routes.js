'use strict';

module.exports = function(app) {
	var ownerships = require('../controllers/ownerships.server.controller');
	var ownershipsPolicy = require('../policies/ownerships.server.policy');

	// Ownerships Routes
	app.route('/api/ownerships').all()
		.get(ownerships.list).all(ownershipsPolicy.isAllowed)
		.post(ownerships.create);

	app.route('/api/ownerships/:ownershipId').all(ownershipsPolicy.isAllowed)
		.get(ownerships.read)
		.put(ownerships.update)
		.delete(ownerships.delete);

	// Finish by binding the Ownership middleware
	app.param('ownershipId', ownerships.ownershipByID);
};