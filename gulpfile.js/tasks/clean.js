'use strict';

const gulp = require('gulp'),
	clean = require('gulp-clean');

const errorHandler = require('../utils/errorHandler'),
	pathJoin = require('utils/pathJoin'),
	paths = require('config/paths');

const src = pathJoin(paths.resources, '*');

function cleanTask () {

	return gulp.src(src)
		.pipe(errorHandler('Clean'))
		.pipe(clean());
}

gulp.task('clean', cleanTask);

module.exports = {
	task: cleanTask
};
