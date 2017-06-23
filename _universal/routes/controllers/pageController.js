import React from 'react';
import { get, isArray, isFunction, partial } from 'lodash';
import { getPage } from 'actions/actionCreators';
import getChildElement from 'lib/getChildElement';
import getRoute from 'lib/getRoute';
import getRouteLang from 'lib/getRouteLang';
import getRoutePath from 'lib/getRoutePath';
import getTemplate from 'lib/getTemplate';
import sanitizePath from 'lib/sanitizePath';

export default function pageController (store, siteMapTree) {

	return (nextState, callback) => { // eslint-disable-line consistent-return

		const { location: { pathname, search } } = nextState,
			sanitizedPathname = sanitizePath(pathname),
			routeLang = getRouteLang(sanitizedPathname),
			routePath = getRoutePath(sanitizedPathname),
			route = getRoute(routePath, siteMapTree);

		if (!route) {

			const err = new Error('No route found.');

			err.status = 404;

			return callback(err);
		}

		const pageKey = `${ routePath }${ search }`,
			pageProps = get(store.getState(), `pages[${ pageKey }].data`),
			routeData = Object.assign({ lang: routeLang }, route);

		// NOTE: Syncronous response must be returned for SSR.
		if (pageProps) {

			try {
				callback(null, createPageComponent(store, routeData, pageProps, false));
			}
			catch (err) {
				callback(err);
			}
		}
		else {

			getPage(pageKey, route.id)(store.dispatch, store.getState)
				.then(extractPageProps)
				.then(partial(createPageComponent, store, routeData))
				.then((page) => { setTimeout(callback.bind(null, null, page), 0); })
				.catch(callback.bind(null));
		}
	};
}

function extractPageProps (page) {

	if (page.errors) {

		const err = new Error('Unable to retrieve page data.');

		err.errors = page.errors;
		err.status = page.status;

		throw err;
	}

	return page.data;
}

function createPageComponent (store, routeData, pageProps, init = true) {

	const Template = getTemplate(pageProps.template),
		{ components, ...restPageProps } = pageProps,
		children = components && components.map(getChildElement),
		PageComponent = ((routeProps) => {

			return (
				<Template
					{ ...Object.assign({
						routeData
					},
					restPageProps,
					routeProps, {
						children
					}) }
				/>
			);
		});

	/**
	 * NOTE: If this 'init' argument is set to true, initialise the child components
	 * 	and return a Promise, otherwise assumed they are already initialised from a prior
	 * 	run and return PageComponent synchronously.
	 */
	if (init) {

		const childElements = isArray(children) ? children : [];

		return Promise.all([
			isFunction(Template.onInit) ? Template.onInit(store, routeData) : Promise.resolve(),
			...childElements.map(initChildElement(store, routeData))
		])
		.then(() => { return PageComponent; });
	}

	return PageComponent;
}

function initChildElement (store) {

	return (component) => {

		const onInit = get(component, 'type.onInit');

		return isFunction(onInit) && onInit(store);
	};
}