'use strict';

const eslint = require('gulp-eslint'),
	fs = require('fs'),
	gulp = require('gulp'),
	open = require('open'),
	path = require('path');

const pathJoin = require('utils/pathJoin'),
	paths = require('config/paths');

const dev = process.env.NODE_ENV === 'development',
	src = [
		pathJoin(paths.scripts.src, '**', '*.js'),
		pathJoin(paths.server, '**', '*.js'),
		pathJoin(paths.universal, '**', '*.js')
	];

function eslintTask () {

	return gulp.src(src)
		.pipe(eslint())
		.pipe(dev ? eslint.format('html', (results) => {

			try {
				fs.mkdirSync(paths.reports);
			}
			catch (err) { /* console.log(err); */ }

			const reportFile = path.join(paths.reports, 'eslint.html');

			fs.writeFileSync(reportFile, results);
			open(reportFile);

		}) : eslint.format())
		.pipe(eslint.failOnError());
}

gulp.task('eslint', eslintTask);

module.exports = {
	task: eslintTask
};
