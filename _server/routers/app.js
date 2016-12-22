'use strict';

const { get } = require('lodash'),
	configureStore = require('stores/configureStore'),
	getPageViewModel = require('lib/getPageViewModel'),
	createStateModel = require('routes/lib/createStateModel').default,
	getRoute = require('routes/lib/getRoute'),
	Foot = require('components/Foot').default,
	Head = require('components/Head').default,
	path = require('path'),
	paths = require('config/paths'),
	React = require('react'),
	Provider = require('react-redux').Provider,
	reactRouter = require('react-router'),
	reactServer = require('react-dom/server'),
	routes = require('routes').default,
	RouterContext = require('react-router').RouterContext,
	url = require('url');

function getHead (props) {

	return reactServer.renderToStaticMarkup(<Head { ...props } />);
}

function getBody (store, routerProps) {

	return reactServer.renderToStaticMarkup(
		<Provider store={ store }>
			<RouterContext { ...routerProps } />
		</Provider>
	);
}

function getFoot (props) {

	return reactServer.renderToStaticMarkup(<Foot { ...props } />);
}

// TODO: Ensure regions like 'main', 'sidebar' etc can be handled.
module.exports = function appRouter (app) {

	return (req, res, next) => {

		const { url: reqUrl } = req,
			sitemap = app.get('sitemap'),
			route = getRoute(url.parse(reqUrl).pathname, sitemap),
			initialState = {},
			store = configureStore.default(initialState);

		if (!route) {
			const err = new Error('No route found.');
			err.status = 404;

			return next(err);
		}

		return getPageViewModel(sitemap)(route.id).then((viewModel) => {

			reactRouter.match({
				routes: routes(store.dispatch, sitemap, createStateModel(viewModel)),
				location: reqUrl
			}, (routeErr, redirectLocation, routerProps) => {

				if (routeErr) {
					return next(routeErr);
				}

				if (redirectLocation) {

					const nextLocation = get(redirectLocation, 'state.next'),
						queryStr = nextLocation && `?next=${ nextLocation }`;

					return res.redirect(`${ redirectLocation.pathname }${ (queryStr || '') }`);
				}

				if (!routerProps) {

					const routerPropsErr = new Error('No App route found.');
					routerPropsErr.status = 404;

					return next(routerPropsErr);
				}

				const imgPath = `/${ path.relative(paths.resources, paths.images.out) }`,
					scriptsPath = `/${ path.relative(paths.resources, paths.scripts.out) }`,
					stylesheetsPath = `/${ path.relative(paths.resources, paths.styles.out) }`;

				// TODO: Consider extracting this into its own function to shorten this mega one!
				return res.send(`<!doctype html>
					<html class="no-js">
						${ getHead({
							iconPath: imgPath,
							scripts: [{
								src: `${ scriptsPath }/modernizr-custom.js`
							}],
							stylesheets: [{
								href: `${ stylesheetsPath }/styles.css`,
								media: 'screen, print'
							}]
						}) }
						<body>
							<div data-app>${ getBody(store, routerProps) }</div>
							${ getFoot({
								scripts: [/*{
									src: `${ scriptsPath }/vendor.js`
								}, */{
									src: `${ scriptsPath }/main.js`
								}],
								sitemap,
								storeState: store.getState(),
								storeReducers: store.getReducerNames(),
								viewModel
							}) }
						</body>
					</html>`
				);
			});
		}).catch(next);
	};
};