import React from 'react';
import { partial } from 'lodash';
import apiUrls from 'constants/apiUrls';
import { getJSON } from 'modules/fetcher';
import BaseTemplate from 'templates/Base';

export default function baseController (siteMapTree, viewModelStore) {

	return (nextState, callback) => {

		const headerViewModel = viewModelStore.get('header'),
			footerViewModel = viewModelStore.get('footer');

		if (headerViewModel && footerViewModel) {

			return callback(null, createTemplate(createViewModel(siteMapTree, [headerViewModel, footerViewModel])));
		}

		Promise.all([
			getJSON(`${ apiUrls.HEADER }`)
				.then(process.env.CLIENT ?
					(viewModel) => { return viewModel; } :
					partial(viewModelStore.set, 'header')),
			getJSON(`${ apiUrls.FOOTER }`)
				.then(process.env.CLIENT ?
					(viewModel) => { return viewModel; } :
					partial(viewModelStore.set, 'footer'))
		])
		.then(partial(createViewModel, siteMapTree))
		.then(createTemplate)
		.then(partial(callback, null))
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