'use strict';

const gulp = require('gulp'),
	customizr = require('customizr');

const modernizrConfig = require('../config/modernizrConfig');

function modernizrTask (done) {

	customizr(modernizrConfig, () => {
		done();
	});
}

// Tasks
gulp.task('modernizr', modernizrTask);

// Exports
module.exports = modernizrTask;
