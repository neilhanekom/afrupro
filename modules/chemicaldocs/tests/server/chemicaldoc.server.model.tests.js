'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Chemicaldoc = mongoose.model('Chemicaldoc');

/**
 * Globals
 */
var user, chemicaldoc;

/**
 * Unit tests
 */
describe('Chemicaldoc Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			chemicaldoc = new Chemicaldoc({
				name: 'Chemicaldoc Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return chemicaldoc.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			chemicaldoc.name = '';

			return chemicaldoc.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Chemicaldoc.remove().exec();
		User.remove().exec();

		done();
	});
});