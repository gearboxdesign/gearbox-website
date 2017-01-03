import React from 'react';
import { loadRoute } from 'actions/actionCreators';
import RouteComponentWrapper from 'components/utils/RouteComponentWrapper';
import apiUrls from 'constants/apiUrls';
import { receiveJSON } from 'modules/fetcher';
import getRoute from 'routes/lib/getRoute';

export default function defaultController (dispatch, siteMapTree, stateModel) {

	return (nextState, callback) => {

		const { location: { pathname } } = nextState,
			route = getRoute(pathname, siteMapTree);

		if (!route) {
			const err = new Error('No route found.');
			err.status = 404;

			throw err;
		}

		const model = stateModel.eject();

		if (model) {

			callback(null, createRouteComponent(route, model));

			return;
		}

		dispatch(loadRoute());

		const next = (...args) => {

			dispatch(loadRoute(true));

			return callback(...args);
		};

		receiveJSON(`${ apiUrls.PAGES }/${ route.id }`)
			.then((viewModel) => {
				setTimeout(next.bind(next, null, createRouteComponent(route, viewModel)), 0);
			})
			.catch(next);
	};
}

function createRouteComponent (route, viewModel) {

	return (routeProps) => {

		return (
			<RouteComponentWrapper
				{ ...Object.assign({}, viewModel, routeProps, {
					routeParams: route.params
				}) }
			/>
		);
	};
}