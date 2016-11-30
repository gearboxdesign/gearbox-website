'use strict';

import { IndexRoute, Route } from 'react-router';
import { partial } from 'lodash';
import React from 'react';
import RouteComponentWrapper from 'components/utils/RouteComponentWrapper';
import apiUrls from 'constants/apiUrls';
import { receiveJSON } from 'modules/fetcher';
import getRoute from 'routes/lib/getRoute';
import RouteTemplate from 'templates/Default';

function getTemplateComponent (sitemap) {

	const { childPages: navigation } = sitemap;
	 
	return (routeProps) => {

		return <RouteTemplate { ...Object.assign({
			navigation
		}, routeProps) } />;
	};
}

function getRouteComponent (sitemap, stateModel) {

	return (nextState, callback) => {

		const { location: { pathname } } = nextState,
			route = getRoute(pathname, sitemap);

		if (!route) {
			const err = new Error('No route found.');
			err.status = 404;
			
			throw err;
		}

		const model = stateModel.eject();

		if (model) {
			// return Promise.resolve(createRouteComponent(route, model));
			callback(null, createRouteComponent(route, model));
		}

		// return receiveJSON(`${ apiUrls.PAGES }/${ route.id }`)
		// 	.then(partial(createRouteComponent, route));
		
		// NOTE: Temporary work-around blocking failure issue with React Router.
		receiveJSON(`${ apiUrls.PAGES }/${ route.id }`)
			.then((modelData) => {
				setTimeout(callback.bind(callback, null, createRouteComponent(route, modelData)), 0);
			})
			.catch(callback);
	};
}

function createRouteComponent (route, model) {

	return (routeProps) => {

		return (
			<RouteComponentWrapper { ...Object.assign({}, model, routeProps, {
					routeParams: route.params
				}) }
			/>
		);
	};
}

export default function (sitemap, stateModel) {

	return (
		<Route component={ getTemplateComponent(sitemap) }
			path="/"
		>
			<IndexRoute getComponent={ getRouteComponent(sitemap, stateModel) } />
			<Route getComponent={ getRouteComponent(sitemap, stateModel) }
				path="*"
			/>
		</Route>
	);
}