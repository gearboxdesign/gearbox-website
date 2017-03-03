'use strict';

const gutil = require('gulp-util'),
	{ partial } = require('lodash'),
	stylelint = require('stylelint'),
	through = require('through2');

const PLUGIN_NAME = 'StyleLint',
	FORMAT_LOG = 'log';

module.exports = function () {

	const lintPromiseArr = [];

	function transform (file, encoding, done) {

		if (file.isNull()) {
			return done(null, file);
		}

		if (file.isStream()) {
			this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming is not supported'));
			return done();
		}

		lintPromiseArr.push(stylelint.lint({
			files: file.path,
			formatter: 'json',
			syntax: 'scss'
		}));

		return done();
	}

	function flush (done) {

		Promise.all(lintPromiseArr)
			.then((results) => {

				const lintResults = results.reduce((resultsArr, currentResultData) => {
					return resultsArr.concat(currentResultData.results);
				}, []);

				this.push(new gutil.File({
					path: 'stylelint.json',
					contents: new Buffer(JSON.stringify(lintResults))
				}));

				done();

			})
			.catch((err) => {

				process.nextTick(() => {

					this.emit('error', new gutil.PluginError(PLUGIN_NAME, err));
					done();

				});

			});
	}

	return through.obj(transform, flush);
};

module.exports.format = function format (type) {

	function transform (file, encoding, done) {

		if (file.isNull()) {
			return done(null, file);
		}

		if (file.isStream()) {

			this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming is not supported'));

			return done();
		}

		try {

			if (!type || type === FORMAT_LOG) {
				logLintResults(JSON.parse(file.contents));
			}
		}
		catch (err) {

			this.emit('error', new gutil.PluginError(PLUGIN_NAME, err));

			return done();
		}

		return done(null, file);
	}

	function logLintResults (lintResults) {

		gutil.log(gutil.colors.cyan('StyleLint Results'));

		lintResults.forEach(logLintResult);
	}

	function logLintResult (result) {

		result.warnings.forEach(partial(logWarning, result.source));
		result.deprecations.forEach(partial(logDeprecation, result.source));
		result.invalidOptionWarnings.forEach(partial(logInvalidOptionWarning, result.source));
	}

	function logWarning (source, warning) {

		const warningColour = warning.severity === 'error' ? 'red' : 'yellow';

		gutil.log(gutil.colors[warningColour](warning.severity.toUpperCase()),
			source,
			warning.text,
			`line: ${ warning.line }, column: ${ warning.column }`
		);
	}

	function logDeprecation (source, deprecation) {

		gutil.log(gutil.colors.yellow('DEPRECATED'),
			source,
			`${ deprecation.text } (${ deprecation.reference })`
		);
	}

	function logInvalidOptionWarning (source, invalidOption) {

		gutil.log(gutil.colors.red('INVALID OPTION'),
			source,
			invalidOption.text
		);
	}

	return through.obj(transform);
};

module.exports.failOnError = function failOnError () {

	function transform (file, encoding, done) {

		if (file.isNull()) {

			return done(null, file);
		}

		if (file.isStream()) {

			this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming is not supported'));

			return done();
		}

		try {

			if (JSON.parse(file.contents).some((result) => {
				return result.errored && result.severity !== 'warning';
			})) {
				throw new Error('StyleLint errors have been found.');
			}
		}
		catch (err) {

			this.emit('error', new gutil.PluginError(PLUGIN_NAME, err));

			return done();
		}

		return done(null, file);
	}

	return through.obj(transform);
};