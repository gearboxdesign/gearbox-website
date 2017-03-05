'use strict';

const gulp = require('gulp');

const pathJoin = require('utils/pathJoin'),
	paths = require('config/paths'),
	stylelint = require('gulp-stylelint');

const src = [
	pathJoin(paths.styles.main, '**', '*.scss'),
	pathJoin(paths.universal, '**', '*.scss')
];

function stylelintTask () {

	return gulp.src(src)
		.pipe(stylelint({
			failAfterError: true,
			reporters: [
				{
					formatter: 'verbose',
					console: true
				}
			]
		}));
}

gulp.task('stylelint', stylelintTask);

module.exports = {
	task: stylelintTask
};
