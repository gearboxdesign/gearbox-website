'use strict';

import { get, memoize, pick, startsWith, zipObject } from 'lodash';

import { getOr as fGetOr, flow as fFlow, map as fMap, replace as fReplace } from 'lodash/fp';

const PATH_FRAG_PATTERN = '(?:/|/([a-z0-9-_]+))';

function resolveRoute (pathname, routesMap) {

	const matchedRoute = routesMap[pathname] || Object.values(routesMap).reduce(getMatchingRoute(pathname), null),
		matchedRoutePattern = get(matchedRoute, 'pattern');

	if (matchedRoutePattern) {

		const [pathnameMatch, ...routeArgs] = Array.from(new RegExp(matchedRoutePattern, 'ig').exec(pathname) || []),
			params = getRouteParams(matchedRoute);

		if (!pathnameMatch) {
			throw new Error('Unexpected parameters for matching route.');
		}

		return Object.assign({}, matchedRoute, {
			params: zipObject(params, routeArgs)
		});
	}

	return matchedRoute;
}

const getRouteParams = fFlow(fGetOr([], 'params'), fMap(fReplace('?', '')));


function getMatchingRoute (pathname) {

	return (previousMatchRoute, route) => {

		const routeMatch = pathname.match(new RegExp(route.pattern, 'ig'));

		/**
		 * NOTE: It is possible for more than one matching route to exist when route parameters are
		 * 	accounted for so it is necessary to qualify them against the url length to ensure nested
		 * 	route url matches have priority.
		*/
		if (routeMatch) {
			return previousMatchRoute ?
				(get(previousMatchRoute, 'url.length') > get(route, 'url.length') ? previousMatchRoute : route) :
				route;
		}

		return previousMatchRoute;
	};
}

const getRoutesMap = memoize((siteMapTreeData) => {

	return [siteMapTreeData].reduce(getRouteData, {});
});

function getRouteRegex (pathname, params) {

	let pattern = pathname;

	if (!params) {
		pattern += '/?';
	}
	else {
		pattern = params.reduce((updatedPattern, param) => {
			return `${ updatedPattern }${ PATH_FRAG_PATTERN }${ startsWith(param, '?') ? '?' : '' }`;
		}, pattern);
	}

	return `^${ pattern }$`;
}

function getRouteData (routesMap, routeData) {

	const { childPages, params, url } = routeData;

	return Object.assign({}, routesMap, {
		[url]: Object.assign({
			url,
			pattern: getRouteRegex(url, params)
		}, pick(routeData, ['id', 'template', 'params']))
	}, childPages && childPages.reduce(getRouteData, routesMap));
}

module.exports = function getRoute (pathname, siteMapTree) {

	if (pathname.includes('?')) {
		throw new Error('Pathname argument should not include a query string.');
	}

	return resolveRoute(pathname, getRoutesMap(siteMapTree));
};