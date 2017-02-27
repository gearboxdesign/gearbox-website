
'use strict';

const apicache = require('apicache'),
	express = require('express'),
	footerController = require('./controllers/footerController'),
	headerController = require('./controllers/headerController'),
	pageController = require('./controllers/pageController'),
	errorHandler = require('handlers/jsonErrorHandler'),
	missingRouteHandler = require('handlers/missingRouteHandler');

const prod = process.env.NODE_ENV === 'production';

// TODO: Verify this works as expected correctly.
const cache = apicache.newInstance({
	statusCodes: {
		include: [200]
	}
});

module.exports = function apiRouter (app) {

	const router = express.Router(); // eslint-disable-line new-cap

	if (prod) {
		router.use(cache(process.env.CACHE_DURATION_API));
	}

	router.get('/footer', footerController);
	router.get('/header', headerController);
	router.get('/pages/:id', pageController(app));

	router.use(missingRouteHandler('API route not found.'));
	router.use(errorHandler);

	return router;
};