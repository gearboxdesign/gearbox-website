'use strict';

const gulp = require('gulp');

gulp.task('scripts', gulp.parallel(
	'modernizr',
	'webpack'
));
