'use strict';

const { get } = require('lodash'),
	logger = require('utils/logger');

module.exports = function clientErrorHandler (err, req, res, next) { // eslint-disable-line no-unused-vars

	logger.error(err);

	const statusCode = err.status || 500; // eslint-disable-line no-magic-numbers

	return res.status(statusCode).json({ // eslint-disable-line no-magic-numbers
		errors: [get(err, 'message') || err.toString()]
	});
};