'use strict';

const gulp = require('gulp');

gulp.task('watch', gulp.series('clean',
	gulp.parallel(
		'fonts',
		'images',
		'modernizr',
		'webpack:watch'
	),
	// 'browserSync',
	gulp.parallel(
		'images:watch'
	)
));
