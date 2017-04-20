'use strict';

const errorHandler = require('utils/errorHandler'),
	gulp = require('gulp'),
	gutil = require('gulp-util');

const paths = require('../../config/paths');

const src = `${ paths.fonts.main }/**/*`,
	dest = paths.fonts.out;

let lastRun = Date.now();

function fontsTask () {

	return processFonts();
}

function fontsWatchTask () {

	if (!src.length) {
		return Promise.resolve();
	}

	return new Promise((resolve, reject) => {

		gulp.watch(src, processFonts.bind(null, { watch: true }))
			.on('ready', resolve)
			.on('error', reject);
	});
}

function processFonts (opts = {}) {

	const srcOptions = opts.watch ? { since: lastRun } : {};

	return new Promise((resolve, reject) => {

		gulp.src(src, srcOptions)
			.pipe(opts.watch ? errorHandler('Images') : gutil.noop())
			.pipe(gulp.dest(dest))
			.on('end', resolve)
			.on('error', reject);

	}).then(() => { lastRun = Date.now(); });
}

// Tasks
gulp.task('fonts', fontsTask);
gulp.task('fonts:watch', fontsWatchTask);

// Exports
module.exports = fontsTask;
module.exports.watch = fontsWatchTask;
