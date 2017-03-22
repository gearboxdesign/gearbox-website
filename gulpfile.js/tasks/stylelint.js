'use strict';

const gulp = require('gulp');

const paths = require('config/paths'),
	stylelint = require('gulp-stylelint');

const src = [
	`${ paths.styles.main }/**/*.scss`,
	`${ paths.universal }/**/*.scss`
];

function stylelintTask () {

	return gulp.src(src)
		.pipe(stylelint({
			failAfterError: true,
			reporters: [{
				formatter: 'verbose',
				console: true
			}]
		}));
}

// Tasks
gulp.task('stylelint', stylelintTask);

// Exports
module.exports = stylelintTask;
