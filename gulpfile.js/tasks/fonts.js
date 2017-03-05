'use strict';

const { partial } = require('lodash'),
	changed = require('gulp-changed'),
	gulp = require('gulp');

const pathJoin = require('utils/pathJoin'),
	paths = require('config/paths');

const src = pathJoin(paths.fonts.main, '**', '*'),
	dest = paths.fonts.out;

function fontsTask () {

	return gulp.src(src)
		.pipe(changed(dest))
		.pipe(gulp.dest(dest));
}

function fontsWatchTask () {

	gulp.watch([
		pathJoin(paths.fonts.main, '**', '*')
	],
	partial(fontsTask, {
		watch: true
	}));
}

gulp.task('fonts', fontsTask);
gulp.task('fonts:watch', fontsWatchTask);

module.exports = {
	task: fontsTask,
	watch: fontsWatchTask
};
