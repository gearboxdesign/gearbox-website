'use strict';

const errorHandler = require('utils/errorHandler'),
	imagemin = require('gulp-imagemin'),
	gulp = require('gulp'),
	gutil = require('gulp-util');

const imageminConfig = require('config/imageminConfig'),
	paths = require('../../config/paths');

const dev = process.env.NODE_ENV === 'development',
	src = `${ paths.images.main }/**/*`,
	dest = paths.images.out;

let lastRun = Date.now();

function imageTask () {

	return processImages();
}

function imageWatchTask () {

	if (!src.length) {
		return Promise.resolve();
	}

	return new Promise((resolve, reject) => {

		gulp.watch(src, processImages.bind(null, { watch: true }))
			.on('ready', resolve)
			.on('error', reject);
	});
}

function processImages (opts = {}) {

	const srcOptions = opts.watch ? { since: lastRun } : {};

	return new Promise((resolve, reject) => {

		gulp.src(src, srcOptions)
			.pipe(opts.watch ? errorHandler('Images') : gutil.noop())
			.pipe(!dev ? imagemin(imageminConfig) : gutil.noop())
			.pipe(gulp.dest(dest))
			.on('end', resolve)
			.on('error', reject);

	}).then(() => { lastRun = Date.now(); });
}

// Tasks
gulp.task('images', imageTask);
gulp.task('images:watch', imageWatchTask);

// Exports
module.exports = imageTask;
module.exports.watch = imageWatchTask;