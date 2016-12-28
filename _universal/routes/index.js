'use strict';

import { IndexRoute, Route } from 'react-router';
import React from 'react';
import { loadRoute } from 'actions/actionCreators';
import RouteComponentWrapper from 'components/utils/RouteComponentWrapper';
import apiUrls from 'constants/apiUrls';
import { receiveJSON } from 'modules/fetcher';
import getRoute from 'routes/lib/getRoute';
import RouteTemplate from 'templates/Default';

function getTemplateComponent (siteMapTree) {

	const { childPages: navigation } = siteMapTree;

	return (routeProps) => {

		return (
			<RouteTemplate
				{ ...Object.assign({
					navigation
				}, routeProps) }
			/>
		);
	};
}

function getRouteComponent (dispatch, siteMapTree, stateModel) {

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
			.then((modelData) => {
				setTimeout(next.bind(next, null, createRouteComponent(route, modelData)), 0);
			})
			.catch(next);
	};
}

function createRouteComponent (route, model) {

	return (routeProps) => {

		return (
			<RouteComponentWrapper
				{ ...Object.assign({}, model, routeProps, {
					routeParams: route.params
				}) }
			/>
		);
	};
}

export default function routes (dispatch, siteMapTree, stateModel) {

	const loadRouteComponent = getRouteComponent(dispatch, siteMapTree, stateModel);

	return (
		<Route
			component={ getTemplateComponent(siteMapTree) }
			path="/"
		>
			<IndexRoute getComponent={ loadRouteComponent } />
			<Route
				getComponent={ loadRouteComponent }
				path="*"
			/>
		</Route>
	);
}