import React from 'react';
import RouteTemplate from 'templates/Default';

export default function rootController (siteMapTree) {

	const { childPages: navigation } = siteMapTree;

	return (routeProps) => {

		return (
			<RouteTemplate
				{ ...Object.assign({
					navigation
				}, routeProps) }
			/>
		);
	};
}