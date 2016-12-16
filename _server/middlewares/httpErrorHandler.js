'use strict';

const Foot = require('components/Foot').default,
	ErrorComponent = require('components/Error').default,
	logger = require('winston'),
	Head = require('components/Head').default,
	httpErrorConstants = require('constants/httpErrors'),
	path = require('path'),
	paths = require('config/paths'),
	React = require('react'),
	reactServer = require('react-dom/server');

const dev = process.env.NODE_ENV === 'development';

module.exports = function httpErrorHandler (err, req, res, next) { // eslint-disable-line no-unused-vars

	logger.error(err);

	const statusCode = err.status || 500, // eslint-disable-line no-magic-numbers
		imgPath = `/${ path.relative(paths.resources, paths.images.out) }`,
		stylesheetsPath = `/${ path.relative(paths.resources, paths.styles.out) }`;

	return res.status(statusCode).send(
		`<!doctype html>
		<html class="no-js">
			${ getHead({
				iconPath: imgPath,
				stylesheets: [{
					href: `${ stylesheetsPath }/styles.css`,
					media: 'screen, print'
				}]
			}) }
			<body>
				${ getBody(err, statusCode) }
				${ getFoot() }
			</body>
		</html>`
	);
};

function getHead (props) {

	return reactServer.renderToStaticMarkup(<Head { ...props } />);
}

function getBody (err, statusCode) {

	return reactServer.renderToStaticMarkup(
		<div>
			<h1>{ statusCode }</h1>
			<ErrorComponent errors={ [(dev && err.message) || httpErrorConstants[statusCode.toString()]] } />
		</div>
	);
}

function getFoot (props) {

	return reactServer.renderToStaticMarkup(<Foot { ...props } />);
}