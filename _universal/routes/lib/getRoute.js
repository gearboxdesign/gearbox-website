'use strict';

import { get, filter, flow, isString, memoize, pick, startsWith, zipObject } from 'lodash';

const PATH_FRAG_PATTERN = '(?:\/|\/([a-z0-9-_]+))';

function getMatchingRoute (pathname, routesMap) {

	const matchedRoute = routesMap[pathname] || Object.values(routesMap).reduce((match, route) => {
		
			const matchTest = pathname.match(new RegExp(route.pattern, 'ig'));

			return match || matchTest && routesMap[route.url];

		}, null),
		matchedRoutePattern = get(matchedRoute, 'pattern');

	if (matchedRoutePattern) {

		const [ pathnameMatch, ...routeArgs ] = Array.from(new RegExp(matchedRoutePattern, 'ig').exec(pathname) || []),
			params = get(matchedRoute, 'params', []).map((param) => {
				return param.replace('?', '');
			});

		if (!pathnameMatch) {
			throw new Error('Unexpected parameters for matching route.');
		}

		return Object.assign({}, matchedRoute, {
			params: zipObject(params, routeArgs)
		});
	}

	return matchedRoute;
}

const getRoutesMap = memoize((sitemapData) => {

	return [sitemapData].reduce(getRouteData, {});
});

function getRouteRegex(pathname, params) {

	let pattern = pathname;

	if (!params) {
		pattern += '\/?';
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

module.exports = function getRoute (pathname, sitemap) {

	if (pathname.includes('?')) {
		throw new Error ('Pathname argument should not include a query string.');
	}

	return getMatchingRoute(pathname, getRoutesMap(sitemap));
};