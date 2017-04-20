'use strict';

const gulp = require('gulp'),
	modernizr = require('tasks/modernizr'),
	webpack = require('tasks/webpack');

const scriptsTask = gulp.parallel(
	modernizr,
	webpack
);

// Tasks
gulp.task('scripts', scriptsTask);

// Exports
module.exports = scriptsTask;