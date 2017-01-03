'use strict';

const { get } = require('lodash'),
	configureStore = require('stores/configureStore'),
	getPageViewModel = require('lib/getPageViewModel'),
	createStateModel = require('lib/createStateModel').default,
	getRoute = require('lib/getRoute'),
	Foot = require('components/Foot').default,
	Head = require('components/Head').default,
	linkEntryTransformer = require('lib/linkEntryTransformer'),
	path = require('path'),
	paths = require('config/paths'),
	React = require('react'),
	Provider = require('react-redux').Provider,
	reactRouter = require('react-router'),
	reactServer = require('react-dom/server'),
	routes = require('routes').default,
	RouterContext = require('react-router').RouterContext,
	url = require('url');

// TODO: Ensure regions like 'main', 'sidebar' etc can be handled.
module.exports = function appRouter (app) {

	return (req, res, next) => {

		const { url: reqUrl } = req,
			siteMap = app.get('siteMap'),
			route = getRoute(url.parse(reqUrl).pathname, siteMap.tree),
			initialState = {},
			store = configureStore.default(initialState);

		if (!route) {
			const err = new Error('No route found.');
			err.status = 404;

			return next(err);
		}

		return getPageViewModel({
			entryTransformers: [linkEntryTransformer(siteMap.dictionary)]
		})(route.id).then((viewModel) => {

			reactRouter.match({
				routes: routes(store.dispatch, siteMap.tree, createStateModel(viewModel)),
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
								// scripts: [{
								// 	src: `${ scriptsPath }/vendor.js`
								// }, {
								// 	src: `${ scriptsPath }/main.js`
								// }],
								scripts: [{
									src: `${ scriptsPath }/main.js`
								}],
								siteMapTree: siteMap.tree,
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