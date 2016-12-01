'use strict';

const express = require('express'),
	auth = require('routers/middlewares/auth'),
	clearContentModelCache = require('./controllers/clearContentModelCache'),
	updateSitemap = require('./controllers/updateSitemap');

module.exports = function webhooksRouter (app) {

	const router = express.Router(); // eslint-disable-line new-cap

	router.use(auth.basic(process.env.WEBHOOKS_AUTH_USER, process.env.WEBHOOKS_AUTH_PASS));

	router.get('/sitemap/update', updateSitemap(app));
	router.get('/cache/clear', clearContentModelCache);

	return router;
};