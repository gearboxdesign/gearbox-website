'use strict';

const express = require('express'),
	webhooks = require('routers/api/webhooks'),
	apiErrorHandler = require('./middlewares/apiErrorHandler'),
	apiMissingRouteHandler = require('./middlewares/apiMissingRouteHandler'),
	getPages = require('./controllers/getPages');

module.exports = function apiRouter (app) {

	const router = express.Router(); // eslint-disable-line new-cap

	router.use('/webhooks', webhooks(app));

	router.get('/pages/:id', getPages);

	router.use(apiMissingRouteHandler);
	router.use(apiErrorHandler);

	return router;
};