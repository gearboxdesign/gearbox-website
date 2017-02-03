import React from 'react';
import { partial } from 'lodash';
import apiUrls from 'constants/apiUrls';
import { getJSON } from 'modules/fetcher';
import BaseTemplate from 'templates/Base';

export default function baseController (siteMapTree, viewModelBuilder) {

	return (nextState, callback) => {

		const headerViewModel = viewModelBuilder.get('header'),
			footerViewModel = viewModelBuilder.get('footer');

		if (headerViewModel && footerViewModel) {

			// TODO: setTimeout may be required here for erroreous components...?
			callback(null, createTemplate(createViewModel(siteMapTree, [headerViewModel, footerViewModel])));

			return;
		}

		Promise.all([
			getJSON(`${ apiUrls.HEADER }`)
				.then(process.env.CLIENT ?
					(viewModel) => { return viewModel; } :
					partial(viewModelBuilder.set, 'header')),
			getJSON(`${ apiUrls.FOOTER }`)
				.then(process.env.CLIENT ?
					(viewModel) => { return viewModel; } :
					partial(viewModelBuilder.set, 'footer'))
		])
		.then(partial(createViewModel, siteMapTree))
		.then(createTemplate)
		.then((templateComponent) => {
			setTimeout(callback.bind(callback, null, templateComponent), 0);
		});
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