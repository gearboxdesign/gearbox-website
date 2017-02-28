import React from 'react';
import { partial } from 'lodash';
import { FOOTER, HEADER } from 'constants/apiUrls';
import { getJSON } from 'modules/fetcher';
import BaseTemplate from 'templates/Base';

const dev = process.env.NODE_ENV === 'development',
	client = process.env.CLIENT;

const passThroughViewModel = (viewModel) => { return viewModel; };

export default function baseController (siteMapTree, viewModelStore) {

	return (nextState, callback) => {

		// NOTE: Consume cached View Models only on the client during development.
		const headerViewModel = (client && dev) ? viewModelStore.consume('header') : viewModelStore.get('header'),
			footerViewModel = (client && dev) ? viewModelStore.consume('footer') : viewModelStore.get('footer');

		if (headerViewModel && footerViewModel) {

			return callback(null, createTemplate(createViewModel(siteMapTree, [headerViewModel, footerViewModel])));
		}

		// NOTE: Only cache View Models on the server or in production.
		Promise.all([
			getJSON(`${ HEADER }`).then((client && dev) ?
				passThroughViewModel :
				partial(viewModelStore.set, 'header')
			),
			getJSON(`${ FOOTER }`).then((client && dev) ?
				passThroughViewModel :
				partial(viewModelStore.set, 'footer')
			)
		])
		.then(partial(createViewModel, siteMapTree))
		.then(createTemplate)
		.then((template) => {
			setTimeout(callback.bind(callback, null, template), 0);
		})
		.catch(callback);
	};
}

function createViewModel (siteMapTree, [headerViewModel, footerViewModel]) {

	return {
		headerProps: {
			navigation: siteMapTree,
			...headerViewModel
		},
		footerProps: {
			...footerViewModel
		}
	};
}

function createTemplate (templateProps) {

	return (routeProps) => {

		return (
			<BaseTemplate
				{ ...Object.assign({
					...templateProps
				}, routeProps) }
			/>
		);
	};
}