'use strict';

const React = require('react'),
	reactServer = require('react-dom/server'),
	logger = require('winston'),
	httpErrorConstants = require('constants/httpErrors'),
	ErrorComponent = require('layouts/Error').default;

const dev = process.env.NODE_ENV === 'development';

/* eslint-disable consistent-return */
module.exports = function httpErrorHandler (err, req, res, next) { // eslint-disable-line no-unused-vars

	logger.error(err);

	const statusCode = err.status || 500; // eslint-disable-line no-magic-numbers

	return res.status(statusCode).send(
		reactServer.renderToStaticMarkup(
			<ErrorComponent { ...{
				message: dev && err.message || httpErrorConstants[statusCode.toString()],
				status: statusCode
			} }
			/>
		)
	);
};

/* eslint-enable */
