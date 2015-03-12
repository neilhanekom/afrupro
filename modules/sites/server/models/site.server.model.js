'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Article Schema
 */
var SiteSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	name: {
		type: String,
		trim: true,
		required: 'You need to specify a Site Name'
	},
	ownership: {
		type: Number,
		ref: 'Ownership'
	},
	location: {
		
		latitude: { type: Number},
		longitude: { type: Number}
	},
	size: {
		type: Number
	},
	products: [],
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Site', SiteSchema);