'use strict';

const path = require('path'),
	paths = require('config/paths'),
	React = require('react'),
	Holding = require('components/ui/Holding').default,
	reactServer = require('react-dom/server'),
	webpackManifest = require('webpack-manifest');

const dev = process.env.NODE_ENV === 'development';

module.exports = function holding (req, res) {

	const appHTML = reactServer.renderToStaticMarkup(
		<Holding title="On Hold" />
	);

	res.set('Cache-Control', `public, max-age=${ dev ? 0 : process.env.CACHE_DURATION_PAGE }`);

	return res.render('templates/holding', {
		app: appHTML,
		manifest: webpackManifest,
		paths: {
			images: `/${ path.relative(paths.resources, paths.images.out) }`,
			scripts: `/${ path.relative(paths.resources, paths.scripts.out) }`,
			stylesheets: `/${ path.relative(paths.resources, paths.styles.out) }`
		},
		title: 'Holding'
	});
};