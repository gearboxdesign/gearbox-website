'use strict';

const getHeaderViewModel = require('lib/getHeaderViewModel');

module.exports = function headerController (req, res, next) {

	const successHandler = res.status(200);

	return getHeaderViewModel()
		.then(successHandler.json.bind(successHandler))
		.catch(next);
};