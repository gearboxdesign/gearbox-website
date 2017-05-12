import React from 'react';
import { partial } from 'lodash';
import { FOOTER, HEADER } from 'constants/apiUrls';
import { getJSON } from 'modules/fetchJSON';
import getRouteLang from 'lib/getRouteLang';
import BaseTemplate from 'templates/Base';

const dev = process.env.NODE_ENV === 'development',
	client = process.env.CLIENT;

const passThroughViewModel = (viewModel) => { return viewModel; };

export default function baseController (siteMapTree, viewModelStore) {

	return (nextState, callback) => { // eslint-disable-line consistent-return

		const { location: { pathname } } = nextState,
			lang = getRouteLang(pathname);

		// NOTE: Consume cached ViewModels only on the client during development.
		const headerViewModel = (client && dev) ? viewModelStore.consume('header') : viewModelStore.get('header'),
			footerViewModel = (client && dev) ? viewModelStore.consume('footer') : viewModelStore.get('footer');

		if (headerViewModel && footerViewModel) {

			return callback(null, createTemplate(createViewModel(lang, siteMapTree, [
				headerViewModel,
				footerViewModel
			])));
		}

		// NOTE: Only cache ViewModels on the server or in production.
		Promise.all([
			getJSON(HEADER).then((client && dev) ?
				passThroughViewModel :
				partial(viewModelStore.set, 'header')
			),
			getJSON(FOOTER).then((client && dev) ?
				passThroughViewModel :
				partial(viewModelStore.set, 'footer')
			)
		])
		.then(partial(createViewModel, lang, siteMapTree))
		.then(createTemplate)
		.then((template) => {

			setTimeout(callback.bind(callback, null, template), 0);
		})
		.catch(callback);
	};
}

function createViewModel (lang, siteMapTree, [headerViewModel, footerViewModel]) {

	return {
		lang,
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