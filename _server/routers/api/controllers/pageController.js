'use strict';

const getPageViewModel = require('lib/getPageViewModel');

module.exports = function pageController (app) {

	return (req, res, next) => {

		const { params: { id: entryId } } = req,
			successHandler = res.status(200);

		return getPageViewModel(app.get('sitemap'))(entryId)
			.then(successHandler.json.bind(successHandler))
			.catch(next);
	};
};