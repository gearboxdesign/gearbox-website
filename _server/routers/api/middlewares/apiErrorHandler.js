'use strict';

const logger = require('winston');

/* eslint-disable consistent-return */
module.exports = function apiErrorHandler (err, req, res, next) { // eslint-disable-line no-unused-vars

	logger.error(err);

	const statusCode = err.status || 500; // eslint-disable-line no-magic-numbers

	return res.status(statusCode).json({ // eslint-disable-line no-magic-numbers
		errors: [err.toString()]
	});
};

/* eslint-enable */
