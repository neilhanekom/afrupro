'use strict';

var should = require('should'),
	request = require('supertest'),
	path = require('path'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Chemicaldoc = mongoose.model('Chemicaldoc'),
	express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, chemicaldoc;

/**
 * Chemicaldoc routes tests
 */
describe('Chemicaldoc CRUD tests', function() {
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

		// Save a user to the test db and create new Chemicaldoc
		user.save(function() {
			chemicaldoc = {
				name: 'Chemicaldoc Name'
			};

			done();
		});
	});

	it('should be able to save Chemicaldoc instance if logged in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Chemicaldoc
				agent.post('/api/chemicaldocs')
					.send(chemicaldoc)
					.expect(200)
					.end(function(chemicaldocSaveErr, chemicaldocSaveRes) {
						// Handle Chemicaldoc save error
						if (chemicaldocSaveErr) done(chemicaldocSaveErr);

						// Get a list of Chemicaldocs
						agent.get('/api/chemicaldocs')
							.end(function(chemicaldocsGetErr, chemicaldocsGetRes) {
								// Handle Chemicaldoc save error
								if (chemicaldocsGetErr) done(chemicaldocsGetErr);

								// Get Chemicaldocs list
								var chemicaldocs = chemicaldocsGetRes.body;

								// Set assertions
								(chemicaldocs[0].user._id).should.equal(userId);
								(chemicaldocs[0].name).should.match('Chemicaldoc Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Chemicaldoc instance if not logged in', function(done) {
		agent.post('/api/chemicaldocs')
			.send(chemicaldoc)
			.expect(403)
			.end(function(chemicaldocSaveErr, chemicaldocSaveRes) {
				// Call the assertion callback
				done(chemicaldocSaveErr);
			});
	});

	it('should not be able to save Chemicaldoc instance if no name is provided', function(done) {
		// Invalidate name field
		chemicaldoc.name = '';

		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Chemicaldoc
				agent.post('/api/chemicaldocs')
					.send(chemicaldoc)
					.expect(400)
					.end(function(chemicaldocSaveErr, chemicaldocSaveRes) {
						// Set message assertion
						(chemicaldocSaveRes.body.message).should.match('Please fill Chemicaldoc name');
						
						// Handle Chemicaldoc save error
						done(chemicaldocSaveErr);
					});
			});
	});

	it('should be able to update Chemicaldoc instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Chemicaldoc
				agent.post('/api/chemicaldocs')
					.send(chemicaldoc)
					.expect(200)
					.end(function(chemicaldocSaveErr, chemicaldocSaveRes) {
						// Handle Chemicaldoc save error
						if (chemicaldocSaveErr) done(chemicaldocSaveErr);

						// Update Chemicaldoc name
						chemicaldoc.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Chemicaldoc
						agent.put('/api/chemicaldocs/' + chemicaldocSaveRes.body._id)
							.send(chemicaldoc)
							.expect(200)
							.end(function(chemicaldocUpdateErr, chemicaldocUpdateRes) {
								// Handle Chemicaldoc update error
								if (chemicaldocUpdateErr) done(chemicaldocUpdateErr);

								// Set assertions
								(chemicaldocUpdateRes.body._id).should.equal(chemicaldocSaveRes.body._id);
								(chemicaldocUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Chemicaldocs if not signed in', function(done) {
		// Create new Chemicaldoc model instance
		var chemicaldocObj = new Chemicaldoc(chemicaldoc);

		// Save the Chemicaldoc
		chemicaldocObj.save(function() {
			// Request Chemicaldocs
			request(app).get('/api/chemicaldocs')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Chemicaldoc if not signed in', function(done) {
		// Create new Chemicaldoc model instance
		var chemicaldocObj = new Chemicaldoc(chemicaldoc);

		// Save the Chemicaldoc
		chemicaldocObj.save(function() {
			request(app).get('/api/chemicaldocs/' + chemicaldocObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', chemicaldoc.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Chemicaldoc instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Chemicaldoc
				agent.post('/api/chemicaldocs')
					.send(chemicaldoc)
					.expect(200)
					.end(function(chemicaldocSaveErr, chemicaldocSaveRes) {
						// Handle Chemicaldoc save error
						if (chemicaldocSaveErr) done(chemicaldocSaveErr);

						// Delete existing Chemicaldoc
						agent.delete('/api/chemicaldocs/' + chemicaldocSaveRes.body._id)
							.send(chemicaldoc)
							.expect(200)
							.end(function(chemicaldocDeleteErr, chemicaldocDeleteRes) {
								// Handle Chemicaldoc error error
								if (chemicaldocDeleteErr) done(chemicaldocDeleteErr);

								// Set assertions
								(chemicaldocDeleteRes.body._id).should.equal(chemicaldocSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Chemicaldoc instance if not signed in', function(done) {
		// Set Chemicaldoc user 
		chemicaldoc.user = user;

		// Create new Chemicaldoc model instance
		var chemicaldocObj = new Chemicaldoc(chemicaldoc);

		// Save the Chemicaldoc
		chemicaldocObj.save(function() {
			// Try deleting Chemicaldoc
			request(app).delete('/api/chemicaldocs/' + chemicaldocObj._id)
			.expect(403)
			.end(function(chemicaldocDeleteErr, chemicaldocDeleteRes) {
				// Set message assertion
				(chemicaldocDeleteRes.body.message).should.match('User is not authorized');

				// Handle Chemicaldoc error error
				done(chemicaldocDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Chemicaldoc.remove().exec();
		done();
	});
});