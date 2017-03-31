'use strict';

const customizr = require('customizr'),
	gulp = require('gulp');

const modernizrConfig = require('config/modernizrConfig');

function modernizrTask (done) {

	customizr(modernizrConfig, () => {
		done();
	});
}

// Tasks
gulp.task('modernizr', modernizrTask);

// Exports
module.exports = modernizrTask;
