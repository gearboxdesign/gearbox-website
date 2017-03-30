'use strict';

const { partial } = require('lodash'),
	gulp = require('gulp');

const paths = require('config/paths');

const src = `${ paths.fonts.main }/**/*`,
	dest = paths.fonts.out;

let lastRun = Date.now() - 1;

function fontsTask (done, opts = {}) {

	return gulp.src(src, opts.watch ? { since: lastRun } : {})
		.pipe(gulp.dest(dest))
		.on('end', () => { lastRun = Date.now(); });
}

function fontsWatchTask () {

	return gulp.watch(src, partial(fontsTask, null, {
		watch: true
	}));
}

// Tasks
gulp.task('fonts', fontsTask);
gulp.task('fonts:watch', fontsWatchTask);

// Exports
module.exports = fontsTask;
module.exports.watch = fontsWatchTask;
