'use strict';

const path = require('path'),
	paths = require('config/paths'),
	React = require('react'),
	Holding = require('components/Holding').default,
	reactServer = require('react-dom/server'),
	webpackManifest = require('webpack-manifest');

module.exports = function holding (req, res) {

	// TODO: Pass title through some form of configuration?
	const appHTML = reactServer.renderToStaticMarkup(
		<Holding title="On Hold" />
	);

	return res.render('templates/holding', {
		app: appHTML,
		manifest: webpackManifest,
		paths: {
			images: `/${ path.relative(paths.resources, paths.images.out) }`,
			stylesheets: `/${ path.relative(paths.resources, paths.styles.out) }`
		},
		title: 'Holding'
	});
};