'use strict';

const pathJoin = require('utils/pathJoin'),
	paths = require('config/paths');

module.exports = {
	cacheBuster: true,
	loadPaths: [
		pathJoin(paths.images.main, '**')
	]
};
