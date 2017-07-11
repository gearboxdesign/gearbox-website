'use strict';

const { get, isPlainObject } = require('lodash'),
	configureStore = require('stores/configureStore'),
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
			sanitizedUrl = sanitizePath(reqUrl),
			formattedUrl = url.format({
				host: req.get('host'),
				pathname: sanitizedUrl,
				protocol: reqProtocol,
				port: process.env.PORT
			}),
			siteMap = app.get('siteMap'),
			initialState = {},
			store = configureStore.default(initialState);

		reactRouter.match({
			routes: routes(store, siteMap.tree),
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

			if (!isPlainObject(routerProps)) {

				const routerPropsErr = new TypeError('"routerProps" argument must be an object');
				routerPropsErr.status = 404;

				return next(routerPropsErr);
			}

			const appHTML = reactServer.renderToString(
				<Provider store={ store }>
					<RouterContext { ...routerProps } />
				</Provider>
			);

			// NOTE: 'ETag' and 'Last-Modified' headers are preset by app.
			res.set('Cache-Control', `public, max-age=${ dev ? 0 : process.env.CACHE_DURATION_PAGE }`);

			const storeState = store.getState();

			return res.render('templates/default', {
				app: appHTML,
				facebook: {
					appId: process.env.FACEBOOK_APP_ID,
					version: process.env.FACEBOOK_VERSION
				},
				manifest: webpackManifest,
				meta: get(storeState, 'document.pageMeta'),
				nonce: get(res, 'locals.nonce'),
				og: get(storeState, 'document.openGraph'),
				paths: {
					images: `/${ path.relative(paths.resources, paths.images.out) }`,
					scripts: `/${ path.relative(paths.resources, paths.scripts.out) }`,
					stylesheets: `/${ path.relative(paths.resources, paths.styles.out) }`
				},
				port: process.env.PORT,
				siteMapTree: get(siteMap, 'tree'),
				storeReducers: store.getReducerNames(),
				storeState,
				title: get(storeState, 'document.title'),
				url: formattedUrl
			});
		});
	};
};