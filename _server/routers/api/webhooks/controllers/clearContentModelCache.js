'use strict';

const createContentModel = require('lib/createContentModel');

module.exports = function createContentModelCache (req, res, next) {
	
	createContentModel.cache.clear();

	return res.status(200).end();
};