'use strict';

const logger = require('utils/logger'),
	getSiteMap = require('lib/getSiteMap');

module.exports = function updateSitemap (app) {

	return (req, res, next) => {

		return getSiteMap().then((siteMapData) => {

			app.set('siteMap', siteMapData);
			app.get('apiCache').clear();

			logger.info('updateSitemap successful, sitemap has been updated and API cache cleared.');

			return res.status(200).end();
		})
			.catch(next);
	};
};