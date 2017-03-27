'use strict';

const gulp = require('gulp'),
	clean = require('tasks/clean'),
	fonts = require('tasks/fonts'),
	images = require('tasks/images'),
	lint = require('compoundTasks/lint'),
	modernizr = require('tasks/modernizr'),
	webpack = require('tasks/webpack');

const defaultTask = gulp.series(
	clean,
	lint,
	gulp.parallel(
		fonts,
		images,
		modernizr,
		webpack
	)
);

// Tasks
gulp.task('default', defaultTask);

// Exports
module.exports = defaultTask;