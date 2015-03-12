'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
	Ownership = mongoose.model('Ownership'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Ownership
 */
exports.create = function(req, res) {
	var ownership = new Ownership(req.body);
	ownership.user = req.user;

	ownership.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ownership);
		}
	});
};

/**
 * Show the current Ownership
 */
exports.read = function(req, res) {
	res.jsonp(req.ownership);
};

/**
 * Update a Ownership
 */
exports.update = function(req, res) {
	var ownership = req.ownership ;

	ownership = _.extend(ownership , req.body);

	ownership.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ownership);
		}
	});
};

/**
 * Delete an Ownership
 */
exports.delete = function(req, res) {
	var ownership = req.ownership ;

	ownership.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ownership);
		}
	});
};

/**
 * List of Ownerships
 */
exports.list = function(req, res) { Ownership.find().sort('-created').populate('user', 'displayName').exec(function(err, ownerships) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ownerships);
		}
	});
};

/**
 * Ownership middleware
 */
exports.ownershipByID = function(req, res, next, id) { Ownership.findById(id).populate('user', 'displayName').exec(function(err, ownership) {
		if (err) return next(err);
		if (! ownership) return next(new Error('Failed to load Ownership ' + id));
		req.ownership = ownership ;
		next();
	});
};