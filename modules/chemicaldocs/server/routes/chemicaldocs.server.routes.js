'use strict';

var multer = require('multer');

module.exports = function(app) {
	var chemicaldocs = require('../controllers/chemicaldocs.server.controller');
	var chemicaldocsPolicy = require('../policies/chemicaldocs.server.policy');

	// when it is time to incorporate our permission policy
	// .all(chemicaldocsPolicy.isAllowed)
	app.route('/api/chemicaldocs')
		.get(chemicaldocs.list)
		.post(chemicaldocs.create);

	app.route('/api/chemicaldocs/:chemicaldocId').all(chemicaldocsPolicy.isAllowed)
		.get(chemicaldocs.read)
		.put(chemicaldocs.update)
		.delete(chemicaldocs.delete);

	app.route('/api/chemicaldoc/upload').post(chemicaldocs.uploadDoc);
	// app.route('/api/chemicaldocs/upload').post(users.changeProfilePicture);

	// Finish by binding the Chemicaldoc middleware
	app.param('chemicaldocId', chemicaldocs.chemicaldocByID);
};