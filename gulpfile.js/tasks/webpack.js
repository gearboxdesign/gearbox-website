'use strict';

const { partial } = require('lodash'),
	gulp = require('gulp'),
	gutil = require('gulp-util'),
	webpack = require('webpack');

const webpackConfig = require('../../webpack.config'),
	webpackCompiler = webpack(webpackConfig);

function webpackTask (done) {

	webpackCompiler.run(partial(webpackComplete, done));
}

function webpackWatchTask (done) {

	webpackCompiler.watch({
		aggregateTimeout: 300,
		poll: true
	}, partial(webpackComplete, done));
}

function webpackComplete (done, error, stats) {

	if (stats.hasErrors() || stats.hasWarnings()) {
		gutil.log('Webpack', stats.toString({ colors: true }));
	}

	if (error) {
		throw new gutil.PluginError('Webpack', error);
	}

	gutil.log('Webpack', 'Bundle created...');

	done();
}

// Tasks
gulp.task('webpack', webpackTask);
gulp.task('webpack:watch', webpackWatchTask);

// Exports
module.exports = webpackTask;
module.exports.watch = webpackWatchTask;
