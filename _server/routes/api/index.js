
'use strict';

const express = require('express'),
	pageController = require('routes/api/controllers/pageController'),
	apiErrorHandler = require('routes/api/handlers/apiErrorHandler'),
	apiMissingRouteHandler = require('routes/api/handlers/apiMissingRouteHandler'),
	webhooks = require('routes/api/webhooks');

module.exports = function apiRouter (app) {

	const router = express.Router(); // eslint-disable-line new-cap

	router.use('/webhooks', webhooks(app));

	router.get('/pages/:id', pageController(app));

	router.use(apiMissingRouteHandler);
	router.use(apiErrorHandler);

	return router;
};