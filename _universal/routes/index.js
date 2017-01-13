'use strict';

import React from 'react';
import { pick } from 'lodash';
import { IndexRoute, Route } from 'react-router';

import pageController from 'routes/controllers/pageController';
import baseController from 'routes/controllers/baseController';

export default function routes (dispatch, siteMapTree, viewModel) {

	const defaultPageController = pageController(dispatch, siteMapTree, viewModel.page);

	return (
		<Route
			component={ baseController(siteMapTree, pick(viewModel, ['header', 'footer'])) }
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