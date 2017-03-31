'use strict';

const clean = require('gulp-clean'),
	errorHandler = require('utils/errorHandler'),
	gulp = require('gulp');

const paths = require('../../config/paths');

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
