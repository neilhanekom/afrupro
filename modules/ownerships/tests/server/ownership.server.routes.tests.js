'use strict';

var should = require('should'),
	request = require('supertest'),
	path = require('path'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Ownership = mongoose.model('Ownership'),
	express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, ownership;

/**
 * Ownership routes tests
 */
describe('Ownership CRUD tests', function() {
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

		// Save a user to the test db and create new Ownership
		user.save(function() {
			ownership = {
				name: 'Ownership Name'
			};

			done();
		});
	});

	it('should be able to save Ownership instance if logged in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Ownership
				agent.post('/api/ownerships')
					.send(ownership)
					.expect(200)
					.end(function(ownershipSaveErr, ownershipSaveRes) {
						// Handle Ownership save error
						if (ownershipSaveErr) done(ownershipSaveErr);

						// Get a list of Ownerships
						agent.get('/api/ownerships')
							.end(function(ownershipsGetErr, ownershipsGetRes) {
								// Handle Ownership save error
								if (ownershipsGetErr) done(ownershipsGetErr);

								// Get Ownerships list
								var ownerships = ownershipsGetRes.body;

								// Set assertions
								(ownerships[0].user._id).should.equal(userId);
								(ownerships[0].name).should.match('Ownership Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Ownership instance if not logged in', function(done) {
		agent.post('/api/ownerships')
			.send(ownership)
			.expect(403)
			.end(function(ownershipSaveErr, ownershipSaveRes) {
				// Call the assertion callback
				done(ownershipSaveErr);
			});
	});

	it('should not be able to save Ownership instance if no name is provided', function(done) {
		// Invalidate name field
		ownership.name = '';

		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Ownership
				agent.post('/api/ownerships')
					.send(ownership)
					.expect(400)
					.end(function(ownershipSaveErr, ownershipSaveRes) {
						// Set message assertion
						(ownershipSaveRes.body.message).should.match('Please fill Ownership name');
						
						// Handle Ownership save error
						done(ownershipSaveErr);
					});
			});
	});

	it('should be able to update Ownership instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Ownership
				agent.post('/api/ownerships')
					.send(ownership)
					.expect(200)
					.end(function(ownershipSaveErr, ownershipSaveRes) {
						// Handle Ownership save error
						if (ownershipSaveErr) done(ownershipSaveErr);

						// Update Ownership name
						ownership.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Ownership
						agent.put('/api/ownerships/' + ownershipSaveRes.body._id)
							.send(ownership)
							.expect(200)
							.end(function(ownershipUpdateErr, ownershipUpdateRes) {
								// Handle Ownership update error
								if (ownershipUpdateErr) done(ownershipUpdateErr);

								// Set assertions
								(ownershipUpdateRes.body._id).should.equal(ownershipSaveRes.body._id);
								(ownershipUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Ownerships if not signed in', function(done) {
		// Create new Ownership model instance
		var ownershipObj = new Ownership(ownership);

		// Save the Ownership
		ownershipObj.save(function() {
			// Request Ownerships
			request(app).get('/api/ownerships')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Ownership if not signed in', function(done) {
		// Create new Ownership model instance
		var ownershipObj = new Ownership(ownership);

		// Save the Ownership
		ownershipObj.save(function() {
			request(app).get('/api/ownerships/' + ownershipObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', ownership.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Ownership instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Ownership
				agent.post('/api/ownerships')
					.send(ownership)
					.expect(200)
					.end(function(ownershipSaveErr, ownershipSaveRes) {
						// Handle Ownership save error
						if (ownershipSaveErr) done(ownershipSaveErr);

						// Delete existing Ownership
						agent.delete('/api/ownerships/' + ownershipSaveRes.body._id)
							.send(ownership)
							.expect(200)
							.end(function(ownershipDeleteErr, ownershipDeleteRes) {
								// Handle Ownership error error
								if (ownershipDeleteErr) done(ownershipDeleteErr);

								// Set assertions
								(ownershipDeleteRes.body._id).should.equal(ownershipSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Ownership instance if not signed in', function(done) {
		// Set Ownership user 
		ownership.user = user;

		// Create new Ownership model instance
		var ownershipObj = new Ownership(ownership);

		// Save the Ownership
		ownershipObj.save(function() {
			// Try deleting Ownership
			request(app).delete('/api/ownerships/' + ownershipObj._id)
			.expect(403)
			.end(function(ownershipDeleteErr, ownershipDeleteRes) {
				// Set message assertion
				(ownershipDeleteRes.body.message).should.match('User is not authorized');

				// Handle Ownership error error
				done(ownershipDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Ownership.remove().exec();
		done();
	});
});