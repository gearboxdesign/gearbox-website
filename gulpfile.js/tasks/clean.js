'use strict';

const gulp = require('gulp'),
	clean = require('gulp-clean');

const errorHandler = require('../utils/errorHandler'),
	paths = require('config/paths');

const src = `${ paths.resources }/*`;

function cleanTask () {

	return gulp.src(src)
		.pipe(errorHandler('Clean'))
		.pipe(clean());
}

// Tasks
gulp.task('clean', cleanTask);

// Exports
module.exports = cleanTask;
