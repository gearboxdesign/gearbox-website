'use strict';

const logger = require('utils/logger'),
	{ ERRORS } = require('constants/http'),
	path = require('path'),
	paths = require('config/paths'),
	React = require('react'),
	reactServer = require('react-dom/server'),
	translate = require('translations').translate,
	webpackManifest = require('webpack-manifest'),
	PageError = require('components/ui/PageError').default;

const dev = process.env.NODE_ENV === 'development';

module.exports = function errorHandler (err, req, res, next) { // eslint-disable-line no-unused-vars

	logger.error(err);

	const { locals: { lang } } = res,
		statusCode = err.status || 500,
		errorHTML = reactServer.renderToStaticMarkup(
			<main>
				<PageError
					errors={ err.errors || [
						(dev && (err.message || err.toString())) ||
						ERRORS[statusCode.toString()]
					] }
					heading={ translate(lang)('errors.heading') }
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