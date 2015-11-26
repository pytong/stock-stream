'use strict';

let mongoose = require('mongoose'),
	Schema = mongoose.Schema,

	Stock = new Schema({
		symbol: String
	});

module.exports = mongoose.model('Stock', Stock);