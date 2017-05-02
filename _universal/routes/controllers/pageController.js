import React from 'react';
import { isFunction, partial } from 'lodash';
import { LANG_CODES } from 'translations';
import { PAGES } from 'constants/apiUrls';
import { getJSON } from 'modules/fetchJSON';
import initComponents from 'lib/initComponents';
import getRoute from 'lib/getRoute';
import getTemplate from 'lib/getTemplate';
import sanitizePath from 'lib/sanitizePath';

const dev = process.env.NODE_ENV === 'development',
	client = process.env.CLIENT;

const passThroughViewModel = (viewModel) => { return viewModel; };

export default function pageController (store, siteMapTree, viewModelStore) {

	return (nextState, callback) => { // eslint-disable-line consistent-return

		const { location: { pathname, search } } = nextState,
			sanitizedPathname = sanitizePath(pathname),
			routePath = getRoutePath(sanitizedPathname),
			reqUrl = `${ sanitizedPathname }${ search }`,
			route = getRoute(routePath, siteMapTree);

		if (!route) {

			const err = new Error('No route found.');
			err.status = 404;

			return callback(err);
		}

		if (viewModelStore.get(reqUrl)) {

			const cachedViewModel = (client && dev) ? viewModelStore.consume(reqUrl) : viewModelStore.get(reqUrl);

			try {

				// NOTE: Consume cached ViewModels only on the client during development.
				callback(null, createTemplate(store, route, cachedViewModel));
			}
			catch (err) {
				callback(err);
			}
		}
		else {

			// NOTE: Only cache ViewModels on the server or in production.
			getJSON(`${ PAGES }/${ route.id }`)
				.then((client && dev) ?
					passThroughViewModel :
					partial(viewModelStore.set, reqUrl)
				)
				.then((viewModel) => {

					const { components } = viewModel;

					// return initComponents(store, components)
					// 	.then(createTemplate.bind(null, store, route, viewModel, true));

					// TODO: Consider any issues which may arise from components being initialised before the template.
					return Promise.all([
						createTemplate(store, route, viewModel, true),
						initComponents(store, components)
					])
					.then(([template]) => {
						return template;
					});
				})
				.then((template) => {

					setTimeout(callback.bind(callback, null, template), 0);
				})
				.catch(callback);
		}
	};
}

function getRoutePath (pathname) {

	const pathFragments = pathname.split('/').slice(1);

	return LANG_CODES.includes(pathFragments[0]) ?
		`/${ pathFragments.slice(1).join('/') }` :
		pathname;
}

function createTemplate (store, route, viewModel, init = false) {

	const Template = getTemplate(route.template);

	if (init && isFunction(Template.onInit)) {

		return Promise.resolve(Template.onInit(store))
			.then(buildTemplate.bind(null, Template, route.params, viewModel));
	}

	// NOTE: With the 'init' argument set to false, function will return a syncronous result.
	return buildTemplate(Template, route.params, viewModel);
}

function buildTemplate (Template, routeParams, viewModel) {

	return (routeProps) => {

		return (
			<Template
				{ ...Object.assign({}, viewModel, routeProps, {
					routeParams
				}) }
			/>
		);
	};
}