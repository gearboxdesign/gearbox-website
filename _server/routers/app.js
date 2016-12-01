'use strict';

const { get } = require('lodash'),
	configureStore = require('stores/configureStore'),
	createContentModel = require('lib/createContentModel'),
	createStateModel = require('routes/lib/createStateModel').default,
	getRoute = require('routes/lib/getRoute'),
	Foot = require('components/Foot').default,
	Head = require('components/Head').default,
	path = require('path'),
	paths = require('config/paths'),
	React = require('react'),
	StoreProvider = require('react-redux').Provider,
	reactRouter = require('react-router'),
	reactServer = require('react-dom/server'),
	reactRedux = require('react-redux'),
	routes = require('routes').default,
	RouterContext = require('react-router').RouterContext,
	url = require('url');

// TODO: Ensure regions like 'main', 'sidebar' etc can be handled.
module.exports = function appRouter (app) {

	return (req, res, next) => {

		const { url: reqUrl } = req,
			route = getRoute(url.parse(reqUrl).pathname, app.get('sitemap'));

		if (!route) {
			const err = new Error('No route found.');
			err.status = 404;
			
			return next(err);
		}

		createContentModel(route.id).then((model) => {

			reactRouter.match({
				routes: routes(app.get('sitemap'), createStateModel(model)),
				location: reqUrl
			}, (routeErr, redirectLocation, routerProps) => {

				if (routeErr) {	
					return next(routeErr);
				}

				if (redirectLocation) {

					const nextLocation = get(redirectLocation, 'state.next'),
						queryStr = nextLocation && '?next=' + nextLocation;

					return res.redirect(`${ redirectLocation.pathname }${ (queryStr || '') }`);
				}

				if (!routerProps) {

					const routerPropsErr = new Error('No App route found.');
					routerPropsErr.status = 404;

					return next(routerPropsErr);
				}

				const initialState = {},
					store = configureStore.default(initialState),
					imgPath = `/${ path.relative(paths.resources, paths.images.out) }`,
					scriptsPath = `/${ path.relative(paths.resources, paths.scripts.out) }`,
					stylesheetsPath = `/${ path.relative(paths.resources, paths.styles.out) }`;

					return res.send(
						`<!doctype html>
						<html>
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
									sitemap: app.get('sitemap'),
									storeState: store.getState(),
									storeReducers: store.getReducerNames(),
									initialModel: model
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
		<StoreProvider store={ store }>
			<RouterContext { ...routerProps } />
		</StoreProvider>
	);
}

function getFoot (props) {

	return reactServer.renderToStaticMarkup(<Foot { ...props } />);
}