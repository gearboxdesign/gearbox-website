'use strict';

const eslint = require('gulp-eslint'),
	gulp = require('gulp');

const paths = require('config/paths');

const src = [
	`${ paths.scripts.src }/**/*.js`,
	`${ paths.server }/**/*.js`,
	`${ paths.universal }/**/*.js'`
];

function eslintTask () {

	return gulp.src(src)
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failOnError());
}

// Tasks
gulp.task('eslint', eslintTask);

// Exports
module.exports = eslintTask;
