'use strict';

const gulp = require('gulp');

gulp.task('watch', gulp.series('clean',
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
