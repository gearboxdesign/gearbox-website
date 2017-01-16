import React from 'react';
import RouteTemplate from 'templates/Default';

export default function baseController (siteMapTree, viewModel) {

	const { header, footer } = viewModel;

	return createRouteTemplate({
		headerProps: {
			navigation: siteMapTree,
			...header
		},
		footerProps: {
			...footer
		}
	});
}

function createRouteTemplate (templateProps) {

	return (routeProps) => {

		return (
			<RouteTemplate
				{ ...Object.assign({
					...templateProps
				}, routeProps) }
			/>
		);
	};
}