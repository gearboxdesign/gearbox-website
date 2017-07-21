'use strict';

const gulp = require('gulp'),
	clean = require('tasks/clean'),
	fonts = require('tasks/fonts'),
	images = require('tasks/images'),
	lint = require('compoundTasks/lint'),
	manifest = require('tasks/manifest'),
	modernizr = require('tasks/modernizr'),
	webpack = require('tasks/webpack');

const defaultTask = gulp.series(
	lint,
	clean,
	gulp.parallel(
		fonts,
		images,
		modernizr,
		manifest,
		webpack
	)
);

// Tasks
gulp.task('default', defaultTask);

// Exports
module.exports = defaultTask;