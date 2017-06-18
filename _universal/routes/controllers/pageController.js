import React from 'react';
import { get, isFunction, partial } from 'lodash';
import { getPage } from 'actions/actionCreators';
import { ERRORS } from 'constants/http';
import { PAGES } from 'constants/apiUrls';
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
			pageKey = `${ routePath }${ search }`,
			route = getRoute(routePath, siteMapTree),
			routeData = Object.assign({ lang: routeLang }, route),
			storeState = store.getState(),
			pageState = get(storeState, `pages[${ pageKey }]`);

		if (!route) {

			const err = new Error('No route found.');
			err.status = 404;

			return callback(null, createError(err));
		}

		// NOTE: A syncronous response must be returned for SSR.
		if (pageState) {

			try {
				callback(null, createPage(store, routeData, pageState, false));
			}
			catch (err) {
				callback(null, createError(err));
			}
		}
		else {

			getJSON(`${ PAGES }/${ route.id }`)
				.then(partial(storePageState, store.dispatch, pageKey))
				.then(partial(createPage, store, routeData))
				.then((page) => {

					setTimeout(callback.bind(callback, null, page), 0);
				})
				.catch((err) => {

					setTimeout(callback.bind(callback, null, createError(err)), 0);
				});
		}
	};
}

function storePageState (dispatch, pageKey, value) {

	dispatch(getPage(pageKey, value));

	return value;
}

function createPage (store, routeData, pageState, initialize = true) {

	const Template = getTemplate(pageState.template),
		{ components, ...restPageState } = pageState,
		children = components && components.map(getChildElement),
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

function createError (err) {

	const statusCode = err.status || 0;

	return (routeProps) => {

		return (
			<ErrorTemplate
				{ ...Object.assign({
					errors: err.errors || [
						(dev && (err.message || err.toString())) ||
						ERRORS[statusCode.toString()]
					],
					statusCode,
					title: statusCode.toString()
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