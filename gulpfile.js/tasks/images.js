'use strict';

const { partial } = require('lodash'),
	imagemin = require('gulp-imagemin'),
	gulp = require('gulp'),
	gutil = require('gulp-util');

const errorHandler = require('../utils/errorHandler'),
	imageminConfig = require('../config/imageminConfig'),
	paths = require('config/paths');

const dev = process.env.NODE_ENV === 'development',
	src = `${ paths.images.main }/**/*`,
	dest = paths.images.out;

function imageTask (done, opts = {}) {

	return gulp.src(src, { since: gulp.lastRun('images') })
		.pipe(opts.watch ? errorHandler('Images') : gutil.noop())
		.pipe(!dev ? imagemin(imageminConfig) : gutil.noop())
		.pipe(gulp.dest(dest));
}

function imageWatchTask () {

	return gulp.watch(src, partial(imageTask, null, {
		watch: true
	}));
}

// Tasks
gulp.task('images', imageTask);
gulp.task('images:watch', imageWatchTask);

// Exports
module.exports = imageTask;
module.exports.watch = imageWatchTask;