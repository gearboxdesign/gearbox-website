'use strict';

const gulp = require('gulp');

const pathJoin = require('utils/pathJoin'),
	paths = require('config/paths'),
	stylelint = require('../plugins/stylelint');

const src = [
	pathJoin(paths.styles.main, '**', '*.scss'),
	pathJoin(paths.universal, '**', '*.scss')
];

function stylelintTask () {

	return gulp.src(src)
		.pipe(stylelint())
		.pipe(stylelint.format())
		.pipe(stylelint.failOnError());
}

gulp.task('stylelint', stylelintTask);

module.exports = {
	task: stylelintTask
};
