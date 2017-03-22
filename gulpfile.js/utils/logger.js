'use strict';

const argv = require('yargs').argv,
	gutil = require('gulp-util'),
	through2 = require('through2');

module.exports = function logger (callback, opts) {

	/* eslint-disable indent */
	return through2.obj((file, encoding, done) => {

		if (!opts.verbose || argv.verbose) {
			gutil.log(gutil.colors[opts.color || 'black'](callback(file, encoding)));
		}

		done(null, file);
	});

	/* eslint-enable */
};