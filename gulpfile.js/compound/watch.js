'use strict';

const gulp = require('gulp');

gulp.task('watch', gulp.series(
	'lint',
	'clean',
	gulp.parallel(
		'fonts',
		'images',
		'modernizr',
		'webpack:watch'
	),
	gulp.parallel(
		'images:watch'
	)
));
