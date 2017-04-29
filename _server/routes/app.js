'use strict';

const { get, pick } = require('lodash'),
	configureStore = require('stores/configureStore'),
	createViewModelStore = require('lib/createViewModelStore').default,
	sanitizePath = require('lib/sanitizePath').default,
	path = require('path'),
	paths = require('config/paths'),
	React = require('react'),
	Provider = require('react-redux').Provider,
	reactRouter = require('react-router'),
	reactServer = require('react-dom/server'),
	routes = require('routes').default,
	RouterContext = require('react-router').RouterContext,
	url = require('url'),
	webpackManifest = require('webpack-manifest');

const dev = process.env.NODE_ENV === 'development';

module.exports = function appRouter (app) {

	return (req, res, next) => { // eslint-disable-line consistent-return

		const { url: reqUrl, protocol: reqProtocol } = req,
			// TODO: Normalize this with pageController resolution.
			sanitizedUrl = sanitizePath(reqUrl),
			formattedUrl = url.format({
				host: req.get('host'),
				pathname: sanitizedUrl,
				protocol: reqProtocol,
				port: process.env.PORT
			}),
			siteMap = app.get('siteMap'),
			initialState = {},
			store = configureStore.default(initialState),
			viewModelStore = createViewModelStore();

		reactRouter.match({
			routes: routes(store, siteMap.tree, viewModelStore),
			location: sanitizedUrl
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

			// TODO: Check pageViewModel is not undefined before rendering or throw error.
			const pageViewModel = viewModelStore.get(sanitizedUrl);

			const appHTML = reactServer.renderToString(
				<Provider store={ store }>
					<RouterContext { ...routerProps } />
				</Provider>
			);

			// NOTE: 'ETag' and 'Last-Modified' headers are preset by app.
			res.set('Cache-Control', `public, max-age=${ dev ? 0 : process.env.CACHE_DURATION_PAGE }`);

			return res.render('templates/default', {
				app: appHTML,
				facebook: {
					appId: process.env.FACEBOOK_APP_ID,
					version: process.env.FACEBOOK_VERSION
				},
				manifest: webpackManifest,
				meta: pageViewModel.pageMeta,
				og: pageViewModel.openGraph,
				paths: {
					images: `/${ path.relative(paths.resources, paths.images.out) }`,
					scripts: `/${ path.relative(paths.resources, paths.scripts.out) }`,
					stylesheets: `/${ path.relative(paths.resources, paths.styles.out) }`
				},
				port: process.env.PORT,
				siteMapTree: siteMap.tree,
				storeReducers: store.getReducerNames(),
				storeState: store.getState(),
				title: pageViewModel.title,
				url: formattedUrl,
				viewModel: pick(viewModelStore.get(), ['header', 'footer', sanitizedUrl])
			});
	});
	};
};