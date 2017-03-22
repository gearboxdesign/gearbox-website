'use strict';

const gulp = require('gulp'),
	clean = require('../tasks/clean'),
	fonts = require('../tasks/fonts'),
	images = require('../tasks/images'),
	lint = require('./lint'),
	modernizr = require('../tasks/modernizr'),
	webpack = require('../tasks/webpack');

const watchTask = gulp.series(
	lint,
	clean,
	gulp.parallel(
		fonts,
		images,
		modernizr,
		webpack.watch
	),
	gulp.parallel(
		fonts.watch,
		images.watch
	)
);

// Tasks
gulp.task('watch', watchTask);

// Exports
module.exports = watchTask;