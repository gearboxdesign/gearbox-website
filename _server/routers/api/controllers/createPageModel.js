'use strict';

const getPageViewModel = require('lib/getPageViewModel');

module.exports = function createPageModel (req, res, next) {

	const { params: { id: routeId } } = req,
		successHandler = res.status(200);

	return getPageViewModel(routeId)
		.then(successHandler.json.bind(successHandler))
		.catch(next);
};