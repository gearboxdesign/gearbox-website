'use strict';

const changed = require('gulp-changed'),
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

gulp.task('fonts', fontsTask);

module.exports = {
	task: fontsTask
};
