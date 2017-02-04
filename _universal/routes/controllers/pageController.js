import React from 'react';
import { get, isFunction, partial } from 'lodash';
import { loadRoute } from 'actions/actionCreators';
import apiUrls from 'constants/apiUrls';
import { getJSON } from 'modules/fetcher';
import getComponent from 'lib/getComponent';
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

		const viewModel = viewModelBuilder.consume('page');

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
			.then(partial(initComponents, store))
			.then(partial(createTemplate, route))
			.then((templateComponent) => {
				setTimeout(next.bind(next, null, templateComponent), 0);
			})
			.catch(next);
	};
}

function initComponents (store, viewModel) {

	const components = get(viewModel, 'components', []).map(getChildComponent);

	return Promise.all(components.map((Component) => {
		return isFunction(Component.onInit) && Component.onInit(store);
	}))
	.then(() => { return viewModel; });
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

function getChildComponent (props) {

	const componentId = get(props, 'meta.componentId');

	// TODO: Handle when componentId is null or getComponent fails.
	return getComponent(componentId);
}