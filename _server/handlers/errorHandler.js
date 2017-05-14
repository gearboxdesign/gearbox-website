'use strict';

const ErrorTemplate = require('templates/Error').default,
	logger = require('utils/logger'),
	{ ERRORS } = require('constants/http'),
	path = require('path'),
	paths = require('config/paths'),
	React = require('react'),
	reactServer = require('react-dom/server'),
	webpackManifest = require('webpack-manifest');

const dev = process.env.NODE_ENV === 'development';

module.exports = function errorHandler (err, req, res, next) { // eslint-disable-line no-unused-vars

	logger.error(err);

	// TODO: Translate 'Error'.
	const statusCode = err.status || 500, // eslint-disable-line no-magic-numbers
		errorHTML = reactServer.renderToStaticMarkup(
			<ErrorTemplate
				errors={ [
					(dev && (err.message || err.toString())) ||
					ERRORS[statusCode.toString()]
				] }
				statusCode={ statusCode }
				title="Error"
			/>
		);

	return res.status(statusCode).render('templates/error', {
		error: errorHTML,
		manifest: webpackManifest,
		paths: {
			images: `/${ path.relative(paths.resources, paths.images.out) }`,
			scripts: `/${ path.relative(paths.resources, paths.scripts.out) }`,
			stylesheets: `/${ path.relative(paths.resources, paths.styles.out) }`
		}
	});
};