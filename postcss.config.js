'use strict';

const pathJoin = require('./utils/pathJoin');

const paths = require('./config/paths'),
	dev = process.env.NODE_ENV === 'development';

module.exports = {
	plugins: Object.assign({
		'autoprefixer': {
			browsers: 'last 2 versions'
		},
		'css-mqpacker': {},
		'postcss-assets': {
			cacheBuster: true,
			loadPaths: [
				pathJoin(paths.images.main, '**')
			]
		},
		'postcss-inline-svg': {
			path: paths.images.main
		}
	}, !dev && {
		'cssnano': {
			safe: true
		}
	})
};