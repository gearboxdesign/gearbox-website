'use strict';

const path = require('path'),
	paths = require('./config/paths'),
	prod = process.env.NODE_ENV === 'production';

module.exports = {
	plugins: Object.assign({
		'autoprefixer': {
			browsers: 'last 2 versions'
		},
		'css-mqpacker': {},
		'postcss-assets': {
			cacheBuster: true,
			loadPaths: [
				path.join(paths.images.main, '**')
			]
		},
		'postcss-inline-svg': {
			path: paths.images.main
		}
	}, prod && {
		'cssnano': {
			safe: true
		}
	})
};