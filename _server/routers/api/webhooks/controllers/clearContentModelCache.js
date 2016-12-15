'use strict';

const getPageViewModel = require('lib/getPageViewModel');

module.exports = function getPageViewModelCache (req, res, next) {
	
	getPageViewModel.cache.clear();

	return res.status(200).end();
};