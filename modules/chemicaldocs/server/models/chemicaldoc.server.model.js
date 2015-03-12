'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Chemicaldoc Schema
 */
var ChemicaldocSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Chemicaldoc name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	type: {
		type: String,
		required: 'Please provide a Doc Type'
	},
	no: {
		type: String
	},
	date: {
		type: Date
	},
	docURL: {
		type: String,
		default: 'modules/chemicaldocs/docs/default.pdf'
	}
});

mongoose.model('Chemicaldoc', ChemicaldocSchema);