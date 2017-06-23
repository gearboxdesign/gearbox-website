'use strict';

const logger = require('utils/logger'),
	translate = require('translations').translate;

module.exports = function jsonErrorHandler (err, req, res, next) { // eslint-disable-line no-unused-vars

	logger.error(err);

	const statusCode = err.status || 500;

	return res.status(statusCode).json({
		errors: err.errors || [translate()(`errors.types.${ statusCode.toString() }`)]
	});
};