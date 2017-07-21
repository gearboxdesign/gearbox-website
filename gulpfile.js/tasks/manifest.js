'use strict';

const errorHandler = require('utils/errorHandler'),
	gulp = require('gulp'),
	gutil = require('gulp-util');

const paths = require('../../config/paths');

const src = `${ paths.client }/manifest.json`,
	dest = paths.resources;

let lastRun = Date.now();

function manifestTask () {

	return processManifest();
}

function manifestWatchTask () {

	if (!src.length) {
		return Promise.resolve();
	}

	return new Promise((resolve, reject) => {

		gulp.watch(src, processManifest.bind(null, { watch: true }))
			.on('ready', resolve)
			.on('error', reject);
	});
}

function processManifest (opts = {}) {

	const srcOptions = opts.watch ? { since: lastRun } : {};

	return new Promise((resolve, reject) => {

		gulp.src(src, srcOptions)
			.pipe(opts.watch ? errorHandler('Manifest') : gutil.noop())
			.pipe(gulp.dest(dest))
			.on('end', resolve)
			.on('error', reject);

	}).then(() => { lastRun = Date.now(); });
}

// Tasks
gulp.task('manifest', manifestTask);
gulp.task('manifest:watch', manifestWatchTask);

// Exports
module.exports = manifestTask;
module.exports.watch = manifestWatchTask;
