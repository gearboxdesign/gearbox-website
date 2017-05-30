'use strict';

const httpErrors = require('constants/http').ERRORS,
	logger = require('utils/logger');

const dev = process.env.NODE_ENV === 'development';

module.exports = function jsonErrorHandler (err, req, res, next) { // eslint-disable-line no-unused-vars

	logger.error(err);

	const statusCode = err.status || 500;

	return res.status(statusCode).json({
		errors: err.errors || [
			(dev && (err.message || err.toString())) ||
			httpErrors[statusCode.toString()]
		]
	});
};