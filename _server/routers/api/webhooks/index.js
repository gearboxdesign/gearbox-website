'use strict';

const express = require('express'),
	auth = require('routers/middlewares/auth'),
	updateSitemap = require('./actions/updateSitemap');

module.exports = function webhooksRouter (app) {

	const router = express.Router(); // eslint-disable-line new-cap

	router.use(auth.basic(process.env.WEBHOOKS_AUTH_USER, process.env.WEBHOOKS_AUTH_PASS));

	router.post('/siteMap/update', updateSitemap(app));

	return router;
};