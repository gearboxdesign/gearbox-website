'use strict';

// TODO: Rename to createPageModel.
const createContentModel = require('lib/createContentModel');

module.exports = function getPages (req, res, next) {

	const { params: { id: routeId } } = req,
		successHandler = res.status(200);

	return createContentModel(routeId)
		.then(successHandler.json.bind(successHandler))
		.catch(next);
};