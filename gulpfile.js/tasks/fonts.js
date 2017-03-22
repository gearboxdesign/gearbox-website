'use strict';

const { partial } = require('lodash'),
	gulp = require('gulp');

const paths = require('config/paths');

const src = `${ paths.fonts.main }/**/*`,
	dest = paths.fonts.out;

function fontsTask () {

	return gulp.src(src, { since: gulp.lastRun('fonts') })
		.pipe(gulp.dest(dest));
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
