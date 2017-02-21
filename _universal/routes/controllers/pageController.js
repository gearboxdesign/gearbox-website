import React from 'react';
import { partial } from 'lodash';
import { loadRoute, setDocumentData } from 'actions/actionCreators';
import apiUrls from 'constants/apiUrls';
import { getJSON } from 'modules/fetcher';
import initComponents from 'lib/initComponents';
import getRoute from 'lib/getRoute';
import getTemplate from 'lib/getTemplate';

export default function defaultController (store, siteMapTree, viewModelBuilder) {

	return (nextState, callback) => {

		const { location: { pathname } } = nextState,
			route = getRoute(pathname, siteMapTree);

		if (!route) {
			const err = new Error('No route found.');
			err.status = 404;

			throw err;
		}

		const viewModel = process.env.CLIENT ? viewModelBuilder.consume('page') : viewModelBuilder.get('page');

		if (process.env.CLIENT && viewModel) {

			updateDocument(store, viewModel);

			return callback(null, createTemplate(route, viewModel));
		}

		store.dispatch(loadRoute());

		const getPageViewModel = viewModel ? Promise.resolve(viewModel) : getJSON(`${ apiUrls.PAGES }/${ route.id }`),
			next = (...args) => {

				store.dispatch(loadRoute(true));

				return callback(...args);
			};

		getPageViewModel.then((pageViewModel) => {

			const { components } = pageViewModel;

			if (!process.env.CLIENT) {
				viewModelBuilder.set('page', pageViewModel);
			}

			return initComponents(store, components)
				.then(updateDocument.bind(null, store, pageViewModel))
				.then(createTemplate.bind(null, route, pageViewModel));
		})
		.then((template) => {
			setTimeout(next.bind(next, null, template), 0);
		})
		.catch(next);
	};
}

function updateDocument (store, pageViewModel) {

	const { heading, title, openGraph, pageMeta } = pageViewModel;

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