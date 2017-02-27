
'use strict';

const express = require('express'),
	footerController = require('./controllers/footerController'),
	headerController = require('./controllers/headerController'),
	pageController = require('./controllers/pageController'),
	errorHandler = require('handlers/jsonErrorHandler'),
	missingRouteHandler = require('handlers/missingRouteHandler');

module.exports = function apiRouter (app) {

	const router = express.Router(); // eslint-disable-line new-cap

	router.use(app.get('apiCache').middleware(process.env.CACHE_DURATION_API));

	router.get('/footer', footerController);
	router.get('/header', headerController);
	router.get('/pages/:id', pageController(app));

	router.use(missingRouteHandler('API route not found.'));
	router.use(errorHandler);

	return router;
};