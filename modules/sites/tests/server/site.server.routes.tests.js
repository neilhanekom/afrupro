'use strict';

var should = require('should'),
	request = require('supertest'),
	path = require('path'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Site = mongoose.model('Site'),
	express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, site;

/**
 * site routes tests
 */
describe('Site CRUD tests', function() {
	before(function(done) {
		// Get application
		app = express.init(mongoose);
		agent = request.agent(app);

		done();
	});

	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new site
		user.save(function() {
			site = {
				title: 'Site Title',
				content: 'Site Content'
			};

			done();
		});
	});

	it('should be able to save an site if logged in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new site
				agent.post('/api/sites')
					.send(site)
					.expect(200)
					.end(function(siteSaveErr, siteSaveRes) {
						// Handle site save error
						if (siteSaveErr) done(siteSaveErr);

						// Get a list of sites
						agent.get('/api/sites')
							.end(function(sitesGetErr, sitesGetRes) {
								// Handle site save error
								if (sitesGetErr) done(sitesGetErr);

								// Get sites list
								var sites = sitesGetRes.body;

								// Set assertions
								(sites[0].user._id).should.equal(userId);
								(sites[0].title).should.match('Site Title');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save an site if not logged in', function(done) {
		agent.post('/api/sites')
			.send(site)
			.expect(403)
			.end(function(siteSaveErr, siteSaveRes) {
				// Call the assertion callback
				done(siteSaveErr);
			});
	});

	it('should not be able to save an site if no title is provided', function(done) {
		// Invalidate title field
		site.title = '';

		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new site
				agent.post('/api/sites')
					.send(site)
					.expect(400)
					.end(function(siteSaveErr, siteSaveRes) {
						// Set message assertion
						(siteSaveRes.body.message).should.match('Title cannot be blank');

						// Handle site save error
						done(siteSaveErr);
					});
			});
	});

	it('should be able to update an site if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new site
				agent.post('/api/sites')
					.send(site)
					.expect(200)
					.end(function(siteSaveErr, siteSaveRes) {
						// Handle site save error
						if (siteSaveErr) done(siteSaveErr);

						// Update site title
						site.title = 'WHY YOU GOTTA BE SO MEAN?';

						// Update an existing site
						agent.put('/api/sites/' + siteSaveRes.body._id)
							.send(site)
							.expect(200)
							.end(function(siteUpdateErr, siteUpdateRes) {
								// Handle site update error
								if (siteUpdateErr) done(siteUpdateErr);

								// Set assertions
								(siteUpdateRes.body._id).should.equal(siteSaveRes.body._id);
								(siteUpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of sites if not signed in', function(done) {
		// Create new site model instance
		var siteObj = new Site(site);

		// Save the site
		siteObj.save(function() {
			// Request sites
			request(app).get('/api/sites')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single site if not signed in', function(done) {
		// Create new site model instance
		var siteObj = new Site(site);

		// Save the site
		siteObj.save(function() {
			request(app).get('/api/sites/' + siteObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('title', site.title);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete an site if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new site
				agent.post('/api/sites')
					.send(site)
					.expect(200)
					.end(function(siteSaveErr, siteSaveRes) {
						// Handle site save error
						if (siteSaveErr) done(siteSaveErr);

						// Delete an existing site
						agent.delete('/api/sites/' + siteSaveRes.body._id)
							.send(site)
							.expect(200)
							.end(function(siteDeleteErr, siteDeleteRes) {
								// Handle site error error
								if (siteDeleteErr) done(siteDeleteErr);

								// Set assertions
								(siteDeleteRes.body._id).should.equal(siteSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete an site if not signed in', function(done) {
		// Set site user 
		site.user = user;

		// Create new site model instance
		var siteObj = new Site(site);

		// Save the site
		siteObj.save(function() {
			// Try deleting site
			request(app).delete('/api/sites/' + siteObj._id)
			.expect(403)
			.end(function(siteDeleteErr, siteDeleteRes) {
				// Set message assertion
				(siteDeleteRes.body.message).should.match('User is not authorized');

				// Handle site error error
				done(siteDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Site.remove().exec();
		done();
	});
});
