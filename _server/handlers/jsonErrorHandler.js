'use strict';

const logger = require('utils/logger'),
	{ translate } = require('translations');

module.exports = function jsonErrorHandler (error, req, res, next) { // eslint-disable-line no-unused-vars

	logger.error(error);

	const statusCode = error.status || 500;

	return res.status(statusCode).json({
		errors: error.errors || [translate()(`errors.types.${ statusCode.toString() }`)]
	});
};