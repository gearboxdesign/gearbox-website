import React from 'react';
import { get, isFunction, partial } from 'lodash';
import { ERRORS as httpErrors } from 'constants/http';
import { PAGES } from 'constants/apiUrls';
import { getJSON } from 'modules/fetchJSON';
import getChildElement from 'lib/getChildElement';
import getRoute from 'lib/getRoute';
import getRouteLang from 'lib/getRouteLang';
import getRoutePath from 'lib/getRoutePath';
import getTemplate from 'lib/getTemplate';
import sanitizePath from 'lib/sanitizePath';
import ErrorTemplate from 'templates/Error';

const dev = process.env.NODE_ENV === 'development',
	client = process.env.CLIENT;

const passThroughViewModel = (viewModel) => { return viewModel; };

export default function pageController (store, siteMapTree, viewModelStore) {

	return (nextState, callback) => { // eslint-disable-line consistent-return

		const { location: { pathname, search } } = nextState,
			sanitizedPathname = sanitizePath(pathname),
			routeLang = getRouteLang(sanitizedPathname),
			routePath = getRoutePath(sanitizedPathname),
			reqUrl = `${ sanitizedPathname }${ search }`,
			route = getRoute(routePath, siteMapTree),
			routeData = Object.assign({ lang: routeLang }, route);

		if (!route) {

			const err = new Error('No route found.');
			err.status = 404;

			return callback(null, createErrorPage(err, routeData));
		}

		if (viewModelStore.get(reqUrl)) {

			const cachedViewModel = (client && dev) ? viewModelStore.consume(reqUrl) : viewModelStore.get(reqUrl);

			try {
				callback(null, createPage(store, routeData, cachedViewModel, false));
			}
			catch (err) {
				callback(null, createErrorPage(err, routeData));
			}
		}
		else {

			getJSON(`${ PAGES }/${ route.id }`)
				.then((client && dev) ? passThroughViewModel : partial(viewModelStore.set, reqUrl))
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

function createPage (store, routeData, viewModel, initialize = true) {

	const Template = getTemplate(viewModel.template),
		{ components } = viewModel,
		children = components.map(getChildElement),
		page = ((routeProps) => {

			return (
				<Template
					{ ...Object.assign({
						routeData
					},
					viewModel,
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