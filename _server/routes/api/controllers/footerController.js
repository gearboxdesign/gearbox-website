'use strict';

const getFooterViewModel = require('lib/getFooterViewModel');

module.exports = function footerController (req, res, next) {

	const successHandler = res.status(200);

	return getFooterViewModel()
		.then(successHandler.json.bind(successHandler))
		.catch(next);
};