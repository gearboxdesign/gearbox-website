'use strict';

const gulp = require('gulp'),
	eslint = require('../tasks/eslint'),
	stylelint = require('../tasks/stylelint');

const lintTask = gulp.series(
	eslint,
	stylelint
);

// Tasks
gulp.task('lint', lintTask);

// Exports
module.exports = lintTask;