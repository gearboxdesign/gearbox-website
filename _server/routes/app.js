'use strict';

const { get } = require('lodash'),
	configureStore = require('stores/configureStore'),
	getFooterViewModel = require('lib/getFooterViewModel'),
	getHeaderViewModel = require('lib/getHeaderViewModel'),
	getPageViewModel = require('lib/getPageViewModel'),
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
// TODO: Refactor into smaller functions.
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

		return Promise.all([
			getHeaderViewModel(),
			getPageViewModel({
				entryTransformers: [linkEntryTransformer(siteMap.dictionary)]
			})(route.id),
			getFooterViewModel()
		])
		.then(combineViewModels)
		.then((viewModel) => {

			reactRouter.match({
				routes: routes(store.dispatch, siteMap.tree, viewModel),
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
						${ reactServer.renderToStaticMarkup(
							<Head
								iconPath={ imgPath }
								scripts={ [{
									src: `${ scriptsPath }/modernizr-custom.js`
								}] }
								stylesheets={ [{
									href: `${ stylesheetsPath }/styles.css`,
									media: 'screen, print'
								}] }
								title={ 'Gearbox Design' }
							/>
						) }
						<body>
							<div data-app>${ reactServer.renderToStaticMarkup(
								<Provider store={ store }>
									<RouterContext { ...routerProps } />
								</Provider>
								) }
							</div>
							${ reactServer.renderToStaticMarkup(
								<Foot
									scripts={ [{
										src: `${ scriptsPath }/main.js`
									}] }
									siteMapTree={ siteMap.tree }
									storeReducers={ store.getReducerNames() }
									storeState={ store.getState() }
									viewModel={ viewModel }
								/>
							) }
						</body>
					</html>`
				);
			});
		})
		.catch(next);
	};
};

function combineViewModels ([header, page, footer]) {

	return Object.assign({
		header,
		page,
		footer
	});
}