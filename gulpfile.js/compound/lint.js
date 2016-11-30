'use strict';

const gulp = require('gulp');

gulp.task('lint', gulp.series(
	'eslint',
	'stylelint'
));
