'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Ownership Schema
 */
var OwnershipSchema = new Schema({
	company: {
		type: String,
		default: '',
		required: 'Please fill Ownership company name',
		trim: true
	},
	owner: {
		type: String
	},
	manager: {
		type: String
	},
	registration: {
		type: String
	},
	sites: [{
		type: Schema.Types.ObjectId,
		ref: 'Site'
	}],
	postal: {
		no: {
			type: String
		},
		office: {
			type: String
		},
		code: {
			type: String
		}
	},
	email: {
		type: String
	},
	contact: {
		home: {
			type: String
		},
		office: {
			type: String
		},
		mobile: {
			type: String
		}
	},
	fruits: [],
	created: {
		type: Date,
		default: Date.now
	},
	_creator: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	users: [{ type: Number, ref: 'User' }]
});

mongoose.model('Ownership', OwnershipSchema);