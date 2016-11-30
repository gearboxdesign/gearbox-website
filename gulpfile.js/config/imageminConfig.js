'use strict';

const pngquant = require('imagemin-pngquant');

module.exports = {
	progressive: true,
	svgoPlugins: [{
		removeViewBox: false
	}],
	use: [pngquant()]
};
