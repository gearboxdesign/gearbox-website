import React from 'react';
import { noop, partial } from 'lodash';
import { enableAnimations, loadRoute, setDocumentData } from 'actions/actionCreators';
import { PAGES } from 'constants/apiUrls';
import { getJSON } from 'modules/fetcher';
import initComponents from 'lib/initComponents';
import getRoute from 'lib/getRoute';
import getTemplate from 'lib/getTemplate';

const prod = process.env.NODE_ENV === 'production',
	client = process.env.CLIENT;

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

		if (viewModelStore.get(reqUrl)) {

			try {
				return next(null, createTemplate(route, viewModelStore.get(reqUrl)));
			}
			catch (err) {
				return next(err);
			}
		}

		store.dispatch(loadRoute());

		getJSON(`${ PAGES }/${ route.id }`)
			// NOTE: Only cache View Model on the server or in production.
			.then((!client || prod) ?
				partial(viewModelStore.set, reqUrl) :
				(viewModel) => { return viewModel; }
			)
			.then((viewModel) => {

				const { components } = viewModel;

				return initComponents(store, components)
					.then(updateDocument.bind(null, store, viewModel))
					.then(createTemplate.bind(null, route, viewModel));
			})
			.then((template) => {

				setTimeout(next.bind(next, null, template), 0);
			})
			.then(client ? () => { store.dispatch(enableAnimations()); } : noop)
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