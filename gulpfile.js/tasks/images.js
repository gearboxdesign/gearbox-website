'use strict';

const { partial } = require('lodash'),
	changed = require('gulp-changed'),
	imagemin = require('gulp-imagemin'),
	gulp = require('gulp'),
	gutil = require('gulp-util');

const errorHandler = require('../utils/errorHandler'),
	imageminConfig = require('../config/imageminConfig'),
	pathJoin = require('utils/pathJoin'),
	paths = require('config/paths');

const dev = process.env.NODE_ENV === 'development',
	src = pathJoin(paths.images.main, '**', '*'),
	dest = paths.images.out;

function imageTask (opts) {

	return gulp.src(src)
		.pipe(opts.watch ? errorHandler('Images') : gutil.noop())
		.pipe(changed(dest))
		.pipe(!dev ? imagemin(imageminConfig) : gutil.noop())
		.pipe(gulp.dest(dest));
}

function imageWatchTask () {

	gulp.watch([
		pathJoin(paths.images.main, '**', '*')
	],
	partial(imageTask, {
		watch: true
	}));
}

gulp.task('images', imageTask);
gulp.task('images:watch', imageWatchTask);

module.exports = {
	task: imageTask,
	watch: imageWatchTask
};
