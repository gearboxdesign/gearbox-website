'use strict';

const express = require('express'),
	auth = require('routes/middlewares/auth'),
	updateSitemap = require('routes/api/webhooks/actions/updateSitemap');

module.exports = function webhooksRouter (app) {

	const router = express.Router(); // eslint-disable-line new-cap

	router.use(auth.basic(process.env.WEBHOOKS_AUTH_USER, process.env.WEBHOOKS_AUTH_PASS));

	router.post('/sitemap/update', updateSitemap(app));

	return router;
};