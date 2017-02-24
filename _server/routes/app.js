'use strict';

const { get, pick } = require('lodash'),
	webpackManifest = require('webpack-manifest'),
	configureStore = require('stores/configureStore'),
	createViewModelStore = require('lib/createViewModelStore').default,
	getRoute = require('lib/getRoute').default,
	getPageViewModel = require('lib/getPageViewModel'),
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

// TODO: Refactor into smaller functions.
module.exports = function appRouter (app) {

	return (req, res, next) => {

		const { url: reqUrl, protocol: reqProtocol } = req,
			formattedUrl = url.format({
				host: req.get('host'),
				pathname: reqUrl,
				protocol: reqProtocol,
				port: process.env.PORT
			}),
			siteMap = app.get('siteMap'),
			route = getRoute(url.parse(reqUrl).pathname, siteMap.tree),
			initialState = {},
			store = configureStore.default(initialState),
			viewModelStore = createViewModelStore();

		if (!route) {
			const err = new Error('No route found.');
			err.status = 404;

			return next(err);
		}

		return getPageViewModel({
			entryTransformers: [linkEntryTransformer(app.get('siteMap').dictionary)]
		})(route.id)
		.then((viewModel) => {

			/**
			 * NOTE: Cache the View Model in viewModelStore using the reqUrl as the key so
			 *	that reactRouter.match does not call getPageViewModel again via the following
			 *	'pages' API request.
			 */
			viewModelStore.set(reqUrl, viewModel);

			reactRouter.match({
				routes: routes(store, siteMap.tree, viewModelStore),
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

				const appHTML = reactServer.renderToString(
					<Provider store={ store }>
						<RouterContext { ...routerProps } />
					</Provider>
				);

				return res.render('templates/default', {
					app: appHTML,
					facebook: {
						appId: process.env.FACEBOOK_APP_ID,
						version: process.env.FACEBOOK_VERSION
					},
					manifest: webpackManifest,
					meta: viewModelStore.get(reqUrl).pageMeta,
					og: viewModelStore.get(reqUrl).openGraph,
					paths: {
						images: `/${ path.relative(paths.resources, paths.images.out) }`,
						scripts: `/${ path.relative(paths.resources, paths.scripts.out) }`,
						stylesheets: `/${ path.relative(paths.resources, paths.styles.out) }`
					},
					port: process.env.PORT,
					siteMapTree: siteMap.tree,
					storeReducers: store.getReducerNames(),
					storeState: store.getState(),
					title: viewModelStore.get(reqUrl).title,
					url: formattedUrl,
					viewModel: pick(viewModelStore.get(), ['header', 'footer', reqUrl])
				});
			});
		})
		.catch(next);
	};
};