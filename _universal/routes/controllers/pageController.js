import React from 'react';
import { loadRoute } from 'actions/actionCreators';
import apiUrls from 'constants/apiUrls';
import { getJSON } from 'modules/fetcher';
import getRoute from 'lib/getRoute';
import getTemplate from 'lib/getTemplate';

export default function defaultController (dispatch, siteMapTree, viewModel) {

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

			callback(null, createTemplate(route, initialViewModel));
			initialViewModel = null;

			return;
		}

		dispatch(loadRoute());

		const next = (...args) => {

			dispatch(loadRoute(true));

			return callback(...args);
		};

		getJSON(`${ apiUrls.PAGES }/${ route.id }`)
			.then((pageViewModel) => {
				setTimeout(next.bind(next, null, createTemplate(route, pageViewModel)), 0);
			})
			.catch(next);
	};
}

function createTemplate (route, viewModel) {

	return (routeProps) => {

		const Template = getTemplate(route.template);

		return (
			<Template
				{ ...Object.assign({}, viewModel, routeProps, {
					routeParams: route.params
				}) }
			/>
		);
	};
}