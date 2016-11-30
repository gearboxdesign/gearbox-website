'use strict';

const getSiteMap = require('lib/getSiteMap');

module.exports = function updateSitemap (app) {

	return (req, res, next) => {

		return getSiteMap().then((sitemapData) => {	
				
				app.set('sitemap', sitemapData);

				return res.status(200).end();
			})
			.catch(next);
	};
};