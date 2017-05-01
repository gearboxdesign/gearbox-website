import React from 'react';
import { partial } from 'lodash';
import { LANG_CODES } from 'translations';
import { setDocumentData } from 'actions/actionCreators';
import { PAGES } from 'constants/apiUrls';
import { getJSON } from 'modules/fetchJSON';
import initComponents from 'lib/initComponents';
import getRoute from 'lib/getRoute';
import getTemplate from 'lib/getTemplate';
import sanitizePath from 'lib/sanitizePath';

const dev = process.env.NODE_ENV === 'development',
	client = process.env.CLIENT;

const passThroughViewModel = (viewModel) => { return viewModel; };

export default function pageController (store, siteMapTree, viewModelStore) {

	return (nextState, callback) => { // eslint-disable-line consistent-return

		const { location: { pathname, search } } = nextState,
			sanitizedPathname = sanitizePath(pathname),
			routePath = getRoutePath(sanitizedPathname),
			reqUrl = `${ sanitizedPathname }${ search }`,
			route = getRoute(routePath, siteMapTree);

		if (!route) {

			const err = new Error('No route found.');
			err.status = 404;

			return callback(err);
		}

		if (viewModelStore.get(reqUrl)) {

			const cachedViewModel = (client && dev) ? viewModelStore.consume(reqUrl) : viewModelStore.get(reqUrl);

			try {

				if (client) {
					updateDocument(store, cachedViewModel);
				}

				// NOTE: Consume cached ViewModels only on the client during development.
				return callback(null, createTemplate(route, cachedViewModel));
			}
			catch (err) {
				return callback(err);
			}
		}

		// NOTE: Only cache ViewModels on the server or in production.
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
			.catch(callback);
	};
}

function getRoutePath (pathname) {

	const pathFragments = pathname.split('/').slice(1);

	return LANG_CODES.includes(pathFragments[0]) ?
		`/${ pathFragments.slice(1).join('/') }` :
		pathname;
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