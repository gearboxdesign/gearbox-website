'use strict';

const getPageViewModel = require('lib/getPageViewModel');

module.exports = function getPageViewModelCache (req, res) {

	getPageViewModel.cache.clear();

	return res.status(200).end();
};