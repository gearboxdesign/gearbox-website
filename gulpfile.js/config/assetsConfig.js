'use strict';

const path = require('path'),
	paths = require('../../config/paths');

module.exports = {
	cacheBuster: true,
	loadPaths: [
		path.join(paths.images.main, '**')
	]
};
