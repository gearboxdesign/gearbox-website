import React from 'react';
import { partial } from 'lodash';
import { FOOTER, HEADER } from 'constants/apiUrls';
import { getJSON } from 'modules/fetcher';
import BaseTemplate from 'templates/Base';

const prod = process.env.NODE_ENV === 'production',
	client = process.env.CLIENT;

const passThroughViewModel = (viewModel) => { return viewModel; };

export default function baseController (siteMapTree, viewModelStore) {

	return (nextState, callback) => {

		const headerViewModel = viewModelStore.get('header'),
			footerViewModel = viewModelStore.get('footer');

		if (headerViewModel && footerViewModel) {

			return callback(null, createTemplate(createViewModel(siteMapTree, [headerViewModel, footerViewModel])));
		}

		Promise.all([
			getJSON(`${ HEADER }`).then((!client || prod) ?
				partial(viewModelStore.set, 'header') :
				passThroughViewModel
			),
			getJSON(`${ FOOTER }`).then((!client || prod) ?
				partial(viewModelStore.set, 'footer') :
				passThroughViewModel
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