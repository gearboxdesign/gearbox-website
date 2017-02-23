'use strict';

const express = require('express'),
	auth = require('routes/middlewares/auth'),
	updateSitemap = require('./actions/updateSitemap'),
	errorHandler = require('handlers/jsonErrorHandler'),
	missingRouteHandler = require('handlers/missingRouteHandler');

module.exports = function webhooksRouter (app) {

	const router = express.Router(); // eslint-disable-line new-cap

	router.use(auth.basic(process.env.WEBHOOKS_AUTH_USER, process.env.WEBHOOKS_AUTH_PASS));

	router.post('/sitemap/update', updateSitemap(app));

	router.use(missingRouteHandler('Webhook route not found.'));
	router.use(errorHandler);

	return router;
};