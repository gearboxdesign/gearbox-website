
'use strict';

const express = require('express'),
	footerController = require('./controllers/footerController'),
	headerController = require('./controllers/headerController'),
	pageController = require('./controllers/pageController'),
	errorHandler = require('handlers/jsonErrorHandler'),
	missingRouteHandler = require('handlers/missingRouteHandler');

module.exports = function apiRouter (app) {

	const router = express.Router(); // eslint-disable-line new-cap

	// TODO: Add server caching (consider apicache) for production, short age expiration and only for status 200.
	router.get('/footer', footerController);
	router.get('/header', headerController);
	router.get('/pages/:id', pageController(app));

	router.use(missingRouteHandler('API route not found.'));
	router.use(errorHandler);

	return router;
};