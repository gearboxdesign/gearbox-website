'use strict';

import React from 'react';
import { IndexRoute, Route } from 'react-router';

import defaultController from 'routes/controllers/defaultController';
import baseController from 'routes/controllers/baseController';

export default function routes (dispatch, siteMapTree, stateModel) {

	const routeController = defaultController(dispatch, siteMapTree, stateModel);

	return (
		<Route
			component={ baseController(siteMapTree) }
			path="/"
		>
			<IndexRoute getComponent={ routeController } />
			<Route
				getComponent={ routeController }
				path="*"
			/>
		</Route>
	);
}