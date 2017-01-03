'use strict';

const getSiteMap = require('lib/getSiteMap');

module.exports = function updateSitemap (app) {

	return (req, res, next) => {

		return getSiteMap().then((siteMapData) => {

			app.set('siteMap', siteMapData);

			return res.status(200).end();
		})
		.catch(next);
	};
};