import React from 'react';
import { partial } from 'lodash';
import { loadRoute } from 'actions/actionCreators';
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

		if (viewModel) {

			// TODO: setTimeout may be required here for erroreous components... needs testing?
			callback(null, createTemplate(route, viewModel));

			return;
		}

		store.dispatch(loadRoute());

		const next = (...args) => {

			store.dispatch(loadRoute(true));

			return callback(...args);
		};

		getJSON(`${ apiUrls.PAGES }/${ route.id }`)
			.then(process.env.CLIENT ?
				(pageViewModel) => { return pageViewModel; } :
				partial(viewModelBuilder.set, 'page'))
			.then(initComponents(store))
			.then(partial(createTemplate, route))
			.then((templateComponent) => {
				setTimeout(next.bind(next, null, templateComponent), 0);
			})
			.catch(next);
	};
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