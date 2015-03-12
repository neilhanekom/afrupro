'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
	Site = mongoose.model('Site'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a site
 */
exports.create = function(req, res) {
	var site = new Site(req.body);
	site.user = req.user;

	site.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(site);
		}
	});
};

/**
 * Show the current site
 */
exports.read = function(req, res) {
	res.json(req.sitee);
};

/**
 * Update a site
 */
exports.update = function(req, res) {
	var site = req.site;

	site.title = req.body.title;
	site.content = req.body.content;

	site.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(site);
		}
	});
};

/**
 * Delete an site
 */
exports.delete = function(req, res) {
	var site = req.site;

	site.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(site);
		}
	});
};

/**
 * List of sites
 */
exports.list = function(req, res) {
	Site.find().sort('-created').populate('user', 'displayName').exec(function(err, sites) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(sites);
		}
	});
};

/**
 * site middleware
 */
exports.siteByID = function(req, res, next, id) {
	Site.findById(id).populate('user', 'displayName').exec(function(err, site) {
		if (err) return next(err);
		if (!site) return next(new Error('Failed to load site ' + id));
		req.site = site;
		next();
	});
};
