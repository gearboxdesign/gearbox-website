'use strict';

const express = require('express'),
	auth = require('routers/api/middlewares/auth'),
	clearContentModelCache = require('./controllers/clearContentModelCache'),
	updateSitemap = require('./controllers/updateSitemap');

module.exports = function webhooksRouter (app) {

	const router = express.Router(); // eslint-disable-line new-cap

	router.use(auth.basic);

	router.get('/sitemap/update', updateSitemap(app));
	router.get('/cache/clear', clearContentModelCache);

	return router;
};