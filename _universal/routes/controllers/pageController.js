import React from 'react';
import { noop, partial } from 'lodash';
import { enableAnimations, loadRoute, setDocumentData } from 'actions/actionCreators';
import { PAGES } from 'constants/apiUrls';
import { getJSON } from 'modules/fetcher';
import initComponents from 'lib/initComponents';
import getRoute from 'lib/getRoute';
import getTemplate from 'lib/getTemplate';

const dev = process.env.NODE_ENV === 'development',
	client = process.env.CLIENT;

const passThroughViewModel = (viewModel) => { return viewModel; };

export default function defaultController (store, siteMapTree, viewModelStore) {

	return (nextState, callback) => { // eslint-disable-line consistent-return

		const { location: { pathname, search } } = nextState,
			reqUrl = `${ pathname }${ search }`,
			route = getRoute(pathname, siteMapTree);

		if (!route) {
			const err = new Error('No route found.');
			err.status = 404;

			throw err;
		}

		if (viewModelStore.get(reqUrl)) {

			try {
				// NOTE: Consume cached View Models only on the client during development.
				return callback(null, createTemplate(route, (client && dev) ?
					viewModelStore.consume(reqUrl) :
					viewModelStore.get(reqUrl)));
			}
			catch (err) {
				return callback(err);
			}
		}

		// NOTE: Only cache View Models on the server or in production.
		getJSON(`${ PAGES }/${ route.id }`)
			.then((client && dev) ?
				passThroughViewModel :
				partial(viewModelStore.set, reqUrl)
			)
			.then((viewModel) => {

				const { components } = viewModel;

				return initComponents(store, components)
					.then(updateDocument.bind(null, store, viewModel))
					.then(createTemplate.bind(null, route, viewModel));
			})
			.then((template) => {

				setTimeout(callback.bind(callback, null, template), 0);
			})
			.then(client ? () => { store.dispatch(enableAnimations()); } : noop)
			.catch(callback);
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