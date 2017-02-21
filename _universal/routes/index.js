'use strict';

import React from 'react';
import { IndexRoute, Route } from 'react-router';

import pageController from 'routes/controllers/pageController';
import baseController from 'routes/controllers/baseController';

export default function routes (store, siteMapTree, viewModelStore) {

	const defaultPageController = pageController(store, siteMapTree, viewModelStore);

	return (
		<Route
			getComponent={ baseController(siteMapTree, viewModelStore) }
			path="/"
		>
			<IndexRoute getComponent={ defaultPageController } />
			<Route
				getComponent={ defaultPageController }
				path="*"
			/>
		</Route>
	);
}