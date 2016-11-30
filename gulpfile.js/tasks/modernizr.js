'use strict';

const gulp = require('gulp'),
	customizr = require('customizr');

const modernizrConfig = require('../config/modernizrConfig');

function modernizrTask (done) {

	customizr(modernizrConfig, () => {
		done();
	});
}

gulp.task('modernizr', modernizrTask);

module.exports = {
	task: modernizrTask
};
