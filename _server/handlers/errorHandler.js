'use strict';

const logger = require('utils/logger'),
	path = require('path'),
	paths = require('config/paths'),
	React = require('react'),
	reactServer = require('react-dom/server'),
	{ translate } = require('translations'),
	webpackManifest = require('webpack-manifest'),
	PageError = require('components/base/PageError').default;

module.exports = function errorHandler (error, req, res, next) { // eslint-disable-line no-unused-vars

	logger.error(error);

	const { locals: { lang } } = res,
		statusCode = error.status || 500,
		errorHTML = reactServer.renderToStaticMarkup(
			<main>
				<PageError
					message={ translate(lang)(`errors.types.${ statusCode.toString() }`) }
					statusCode={ statusCode }
				/>
			</main>
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