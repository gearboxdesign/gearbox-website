import React from 'react';
import BaseTemplate from 'templates/Base';

export default function baseController (siteMapTree, viewModel) {

	const { header, footer } = viewModel;

	return createTemplate({
		headerProps: {
			navigation: siteMapTree,
			...header
		},
		footerProps: {
			...footer
		}
	});
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