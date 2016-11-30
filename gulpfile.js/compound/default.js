'use strict';

const gulp = require('gulp');

gulp.task('default', gulp.series(
	'lint',
	'clean',
	gulp.parallel(
		'fonts',
		'images',
		'modernizr',
		'webpack'
	)
));
