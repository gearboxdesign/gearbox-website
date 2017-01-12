import React from 'react';
import RouteTemplate from 'templates/Default';

export default function baseController (siteMapTree) {

	const { childPages: navigation } = siteMapTree;

	return createRouteTemplate({
		headerProps: {
			navigation
		},
		footerProps: {}
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