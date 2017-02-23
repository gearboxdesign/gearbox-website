import React from 'react';
import { get } from 'lodash';
import { enableAnimations, loadRoute, setDocumentData } from 'actions/actionCreators';
import { PAGES } from 'constants/apiUrls';
import { getJSON } from 'modules/fetcher';
import initComponents from 'lib/initComponents';
import getRoute from 'lib/getRoute';
import getTemplate from 'lib/getTemplate';

export default function defaultController (store, siteMapTree, viewModelStore) {

	return (nextState, callback) => {

		const { location: { pathname, search } } = nextState,
			reqUrl = `${ pathname }${ search }`,
			route = getRoute(pathname, siteMapTree),
			/**
			 * TODO: Consider leveraging this on the client side to maintain a broader map
			 *	in client storage for quicker access, or consider service worker for client performance.
			 */
			useCachedViewModel = get(viewModelStore.get('page'), 'reqUrl') === reqUrl;

		if (!route) {
			const err = new Error('No route found.');
			err.status = 404;

			throw err;
		}

		if (process.env.CLIENT && useCachedViewModel) {

			try {
				return callback(null, createTemplate(route, viewModelStore.get('page')));
			}
			catch (err) {
				return callback(err);
			}
		}

		store.dispatch(loadRoute());

		const getPageViewModel = useCachedViewModel ?
			Promise.resolve(viewModelStore.get('page')) :
			getJSON(`${ PAGES }/${ route.id }`),
			next = (...args) => {

				store.dispatch(loadRoute(true));

				if (process.env.CLIENT) {
					store.dispatch(enableAnimations());
				}

				return callback(...args);
			};

		getPageViewModel.then((viewModel) => {

			const { components } = viewModel;

			viewModelStore.set('page', Object.assign({ reqUrl }, viewModel));

			return initComponents(store, components)
				.then(updateDocument.bind(null, store, viewModel))
				.then(createTemplate.bind(null, route, viewModel));
		})
		.then((template) => {
			setTimeout(next.bind(next, null, template), 0);
		})
		.catch(next);
	};
}

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