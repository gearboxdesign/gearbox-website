import React from 'react';
import { partial } from 'lodash';
import { enableAnimations, loadRoute, setDocumentData } from 'actions/actionCreators';
import { PAGES } from 'constants/apiUrls';
import { getJSON } from 'modules/fetcher';
import initComponents from 'lib/initComponents';
import getRoute from 'lib/getRoute';
import getTemplate from 'lib/getTemplate';

const dev = process.env.NODE_ENV === 'development';

export default function defaultController (store, siteMapTree, viewModelStore) {

	return (nextState, callback) => {

		const { location: { pathname, search } } = nextState,
			reqUrl = `${ pathname }${ search }`,
			route = getRoute(pathname, siteMapTree),
			next = (...args) => {

				store.dispatch(loadRoute(true));

				return callback(...args);
			};

		if (!route) {
			const err = new Error('No route found.');
			err.status = 404;

			throw err;
		}

		/**
		 * NOTE: Retreive the cached page View Model Client side only ensuring that
		 *	when the router is initialised following the first render, the 'pages'
		 *	API request isn't recalled. Consume this in development to ensure each
		 *	reload is fresh, otherwise retain the cache in production for instant render.
		 */
		if (process.env.CLIENT && viewModelStore.get(reqUrl)) {

			try {

				if (dev) {
					return next(null, createTemplate(route, viewModelStore.consume(reqUrl)));
				}

				return next(null, createTemplate(route, viewModelStore.get(reqUrl)));
			}
			catch (err) {
				return next(err);
			}
		}

		store.dispatch(loadRoute());

		const getPageViewModel = viewModelStore.get(reqUrl) ?
			Promise.resolve(viewModelStore.get(reqUrl)) :
			getJSON(`${ PAGES }/${ route.id }`);

		// NOTE: Cache all subsequent requests.
		getPageViewModel.then(!dev ?
			partial(viewModelStore.set, reqUrl) :
			passThroughViewModel
		)
		.then((viewModel) => {

			const { components } = viewModel;

			console.log('init');

			return initComponents(store, components)
				.then(updateDocument.bind(null, store, viewModel))
				.then(createTemplate.bind(null, route, viewModel));
		})
		.then((template) => {

			setTimeout(next.bind(next, null, template), 0);
		})
		.then(process.env.CLIENT ?
			() => { store.dispatch(enableAnimations()); } :
			passThroughViewModel
		)
		.catch(next);
	};
}

function passThroughViewModel (viewModel) { return viewModel; }

function updateDocument (store, viewModel) {

	const { title, openGraph, pageMeta } = viewModel;

	store.dispatch(setDocumentData({
		title,
		openGraph,
		pageMeta
	}));
}

function createTemplate (route, viewModel) {

	const Template = getTemplate(route.template);

	return (routeProps) => {

		return (
			<Template
				{ ...Object.assign({}, viewModel, routeProps, {
					routeParams: route.params
				}) }
			/>
		);
	};
}