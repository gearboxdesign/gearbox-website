'use strict';

const getHeaderViewModel = require('lib/getHeaderViewModel');

module.exports.get = function get (req, res, next) {

	const successHandler = res.status(200);

	return getHeaderViewModel()
		.then(successHandler.json.bind(successHandler))
		.catch(next);
};