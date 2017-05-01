
'use strict';

const express = require('express'),
	contactController = require('./controllers/contactController'),
	contactModel = require('models/contact').default,
	footerController = require('./controllers/footerController'),
	headerController = require('./controllers/headerController'),
	pageController = require('./controllers/pageController'),
	tweetsController = require('./controllers/tweetsController'),
	errorHandler = require('handlers/jsonErrorHandler'),
	missingRouteHandler = require('handlers/missingRouteHandler'),
	validateBody = require('middlewares/validateBody');

const dev = process.env.NODE_ENV === 'development';

module.exports = function apiRouter (app) {

	const router = express.Router(); // eslint-disable-line new-cap

	// NOTE: This also sets a minimum Cache-Control: max-age header.
	router.use(app.get('apiCache').middleware(dev ? 0 : process.env.CACHE_DURATION_API));

	router.post('/contact', validateBody(contactModel), contactController.post);
	router.get('/footer', footerController.get);
	router.get('/header', headerController.get);
	router.get('/pages/:id', pageController.get(app));
	router.get('/tweets', tweetsController.get);

	router.use(missingRouteHandler('API route not found.'));
	router.use(errorHandler);

	return router;
};