'use strict';

const httpErrors = require('constants/http').ERRORS,
	logger = require('utils/logger');

const dev = process.env.NODE_ENV === 'development';

module.exports = function jsonErrorHandler (err, req, res, next) { // eslint-disable-line no-unused-vars

	logger.error(err);

	const statusCode = err.status || 500; // eslint-disable-line no-magic-numbers

	return res.status(statusCode).json({ // eslint-disable-line no-magic-numbers
		errors: err.errors || [
			(dev && (err.message || err.toString())) ||
			httpErrors[statusCode.toString()]
		]
	});
};