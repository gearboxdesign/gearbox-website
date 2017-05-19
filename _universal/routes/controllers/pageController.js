import React from 'react';
import { get, isFunction, partial } from 'lodash';
import { ERRORS as httpErrors } from 'constants/http';
import { PAGES } from 'constants/apiUrls';
import { getPage } from 'actions/actionCreators';
import { getJSON } from 'modules/fetchJSON';
import getChildElement from 'lib/getChildElement';
import getRoute from 'lib/getRoute';
import getRouteLang from 'lib/getRouteLang';
import getRoutePath from 'lib/getRoutePath';
import getTemplate from 'lib/getTemplate';
import sanitizePath from 'lib/sanitizePath';
import ErrorTemplate from 'templates/Error';

const dev = process.env.NODE_ENV === 'development';

export default function pageController (store, siteMapTree) {

	return (nextState, callback) => { // eslint-disable-line consistent-return

		const { location: { pathname, search } } = nextState,
			sanitizedPathname = sanitizePath(pathname),
			routeLang = getRouteLang(sanitizedPathname),
			routePath = getRoutePath(sanitizedPathname),
			reqUrl = `${ sanitizedPathname }${ search }`,
			route = getRoute(routePath, siteMapTree),
			routeData = Object.assign({ lang: routeLang }, route),
			storeState = store.getState(),
			pageState = get(storeState, `pages[${ reqUrl }]`);

		if (!route) {

			const err = new Error('No route found.');
			err.status = 404;

			return callback(null, createErrorPage(err, routeData));
		}

		if (pageState) {

			try {
				callback(null, createPage(store, routeData, pageState, false));
			}
			catch (err) {
				callback(null, createErrorPage(err, routeData));
			}
		}
		else {

			getJSON(`${ PAGES }/${ route.id }`)
				.then(partial(storePageState, store.dispatch, reqUrl))
				.then(partial(createPage, store, routeData))
				.then((page) => {

					setTimeout(callback.bind(callback, null, page), 0);
				})
				.catch((err) => {

					setTimeout(callback.bind(callback, null, createErrorPage(err, routeData)), 0);
				});
		}
	};
}

function storePageState (dispatch, reqUrl, value) {

	dispatch(getPage(reqUrl, value));

	return value;
}

function createPage (store, routeData, pageState, initialize = true) {

	const Template = getTemplate(pageState.template),
		{ components, ...restPageState } = pageState,
		children = components.map(getChildElement),
		page = ((routeProps) => {

			return (
				<Template
					{ ...Object.assign({
						routeData
					},
					restPageState,
					routeProps, {
						children
					}) }
				/>
			);
		});

	if (initialize) {

		return Promise.all([
			isFunction(Template.onInit) ? Template.onInit(store, routeData) : Promise.resolve(),
			...children.map(initChildElement(store, routeData))
		])
		.then(() => { return page; });
	}

	// NOTE: If the 'initialize' argument set to true, return with a syncronous result.
	return page;
}

function createErrorPage (err, routeData) {

	const statusCode = err.status || 500; // eslint-disable-line no-magic-numbers

	return (routeProps) => {

		// TODO: Translate 'Error'.
		return (
			<ErrorTemplate
				{ ...Object.assign({
					errors: [
						(dev && (err.message || err.toString())) ||
						httpErrors[statusCode.toString()]
					],
					statusCode,
					title: 'Error'
				},
				routeProps) }
			/>
		);
	};
}

function initChildElement (store) {

	return (component) => {

		const onInit = get(component, 'type.onInit');

		return isFunction(onInit) && onInit(store);
	};
}