'use strict';

import React from 'react';
import { partial } from 'lodash';
import { IndexRoute, Route } from 'react-router';
import { enableAnimations, loadRoute } from 'actions/actionCreators';
import pageController from 'routes/controllers/pageController';
import baseController from 'routes/controllers/baseController';

export default function routes (store, siteMapTree, viewModelStore) {

	const defaultPageController = pageController(store, siteMapTree, viewModelStore),
		onLeaveRouteHandler = partial(onLeaveRoute, store);

	return (
		<Route
			getComponent={ baseController(siteMapTree, viewModelStore) }
			path="/"
		>
			<IndexRoute
				getComponent={ defaultPageController }
				onLeave={ onLeaveRouteHandler }
			/>
			<Route
				getComponent={ defaultPageController }
				onLeave={ onLeaveRouteHandler }
				path="*"
			/>
		</Route>
	);
}

function onLeaveRoute (store) {

	store.dispatch(loadRoute());
	store.dispatch(enableAnimations());
}