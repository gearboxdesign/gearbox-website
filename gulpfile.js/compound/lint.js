'use strict';

const gulp = require('gulp');

gulp.task('lint', gulp.series(
	'eslint'// ,
	// NOTE: Currently disabled as prepended parent selectors (e.g. .js & {...}) cause error 'Converting circular structure to JSON'
	// 'stylelint'
));
