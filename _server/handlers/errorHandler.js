'use strict';

const ErrorComponent = require('components/ui/Error').default,
	logger = require('utils/logger'),
	httpErrorConstants = require('constants/httpErrors'),
	path = require('path'),
	paths = require('config/paths'),
	React = require('react'),
	reactServer = require('react-dom/server'),
	webpackManifest = require('webpack-manifest');

const dev = process.env.NODE_ENV === 'development';

module.exports = function errorHandler (err, req, res, next) { // eslint-disable-line no-unused-vars

	logger.error(err);

	const statusCode = err.status || 500, // eslint-disable-line no-magic-numbers
		errorHTML = reactServer.renderToStaticMarkup(
			<div>
				<h1>{ statusCode }</h1>
				<ErrorComponent
					errors={ [
						(dev && (err.message || err.toString())) || 
						httpErrorConstants[statusCode.toString()]
					] }
				/>
			</div>
		);

	return res.status(statusCode).render('templates/error', {
		error: errorHTML,
		manifest: webpackManifest,
		paths: {
			images: `/${ path.relative(paths.resources, paths.images.out) }`,
			stylesheets: `/${ path.relative(paths.resources, paths.styles.out) }`
		}
	});
};
