'use strict';

const express = require('express'),
	webhooks = require('routers/api/webhooks'),
	apiErrorHandler = require('./errorHandlers/apiErrorHandler'),
	apiMissingRouteHandler = require('./errorHandlers/apiMissingRouteHandler'),
	pageController = require('./controllers/pageController');

module.exports = function apiRouter (app) {

	const router = express.Router(); // eslint-disable-line new-cap

	router.use('/webhooks', webhooks(app));

	router.get('/pages/:id', pageController(app));

	router.use(apiMissingRouteHandler);
	router.use(apiErrorHandler);

	return router;
};