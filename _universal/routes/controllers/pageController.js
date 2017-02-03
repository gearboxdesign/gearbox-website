import React from 'react';
import { get, isFunction, partial } from 'lodash';
import { loadRoute } from 'actions/actionCreators';
import apiUrls from 'constants/apiUrls';
import { getJSON } from 'modules/fetcher';
import getComponent from 'lib/getComponent';
import getRoute from 'lib/getRoute';
import getTemplate from 'lib/getTemplate';

export default function defaultController (store, siteMapTree, viewModel) {

	let initialViewModel = viewModel;

	return (nextState, callback) => {

		const { location: { pathname } } = nextState,
			route = getRoute(pathname, siteMapTree);

		if (!route) {
			const err = new Error('No route found.');
			err.status = 404;

			throw err;
		}

		/**
		 * NOTE: initialViewModel is used only once, this facilities the initial render by ensuring no
		 *  duplicate call is made on the first pass, passing the 'initialViewModel' as the component
		 *  ViewModel before discarding for subsequent invocations which require a fresh request.
		*/
		if (initialViewModel) {

			if (process.env.CLIENT) {

				/**
				 * NOTE: The process of calling 'onInit' handlers for each of the top level components
				 *	is unecessary during the initial render on the client side as this will already have
				 * 	been performed, and redux stores updated by the initial server render.
				*/
				callback(null, createTemplate(route, initialViewModel));
			}
			else {

				console.log('get components');

				initComponents(store, initialViewModel)
					.then(partial(createTemplate, route))
					.then((templateComponent) => {
						return callback(null, templateComponent);
					})
					.catch(callback);
			}

			initialViewModel = null;

			return;
		}

		store.dispatch(loadRoute());

		const next = (...args) => {

			store.dispatch(loadRoute(true));

			return callback(...args);
		};

		getJSON(`${ apiUrls.PAGES }/${ route.id }`)
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
	.then(() => {
		return viewModel;
	});
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

function getChildComponent (props, i) {

	const componentId = get(props, 'meta.componentId');

	// TODO: Handle when componentId is null or getComponent fails.
	return getComponent(componentId);
}