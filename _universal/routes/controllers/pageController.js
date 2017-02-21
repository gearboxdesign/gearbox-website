import React from 'react';
import { get, partial } from 'lodash';
import { loadRoute, setDocumentData } from 'actions/actionCreators';
import apiUrls from 'constants/apiUrls';
import { getJSON } from 'modules/fetcher';
import initComponents from 'lib/initComponents';
import getRoute from 'lib/getRoute';
import getTemplate from 'lib/getTemplate';

export default function defaultController (store, siteMapTree, viewModelStore) {

	return (nextState, callback) => {

		const { location: { pathname, search } } = nextState,
			reqUrl = `${ pathname }${ search }`,
			route = getRoute(pathname, siteMapTree),
			useCachedViewModel = get(viewModelStore.get('page'), 'reqUrl') === reqUrl;

		if (!route) {
			const err = new Error('No route found.');
			err.status = 404;

			throw err;
		}

		// if (useCachedViewModel) {

		// 	try {
		// 		return callback(null, createTemplate(route, viewModelStore.get('page')));
		// 	}
		// 	catch (err) {
		// 		return callback(err);
		// 	}
		// }

		store.dispatch(loadRoute());

		const getPageViewModel = useCachedViewModel ? Promise.resolve(viewModelStore.get('page')) : getJSON(`${ apiUrls.PAGES }/${ route.id }`),
			next = (...args) => {

				store.dispatch(loadRoute(true));

				return callback(...args);
			};

		getPageViewModel.then((viewModel) => {

			const { components } = viewModel;

			viewModelStore.set('page', Object.assign({ reqUrl }, viewModel));

			return initComponents(store, components)
				.then((children) => {

					updateDocument(store, viewModel);

					// TODO: Omit components as they are not required.
					return createTemplate(route, Object.assign({
						children
					}, viewModel));
				});
				// .then(createTemplate.bind(null, route, viewModel));
				// .then(updateDocument.bind(null, store, viewModel))
		})
		.then(partial(next, null))
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
				{ ...Object.assign({}, routeProps, viewModel, {
					routeParams: route.params
				}) }
			/>
		);
	};
}