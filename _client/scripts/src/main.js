// NOTE: Some additional direct imports may be required, e.g. Promise, test this against target browsers.
// import 'babel-polyfill';

import { reduce } from 'lodash';
import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from 'routes';
import configureStore from 'stores/configureStore';
import createViewModelBuilder from 'lib/createViewModelBuilder';

const reducers = reduce(window.STORE_REDUCERS, getReducers, {}),
	store = configureStore(window.STORE_STATE, reducers),
	viewModelBuilder = createViewModelBuilder(window.VIEW_MODEL);

ReactDOM.render(
	<Provider store={ store }>
		<Router
			history={ browserHistory }
			routes={ routes(store, window.SITE_MAP_TREE, viewModelBuilder) }
		/>
	</Provider>, document.querySelector('[data-app]')
);

function getReducers (resolvedReducers, value, key) {

	return Object.assign({}, resolvedReducers, {
		[key]: require(`reducers/${ value }`).default // eslint-disable-line global-require
	});
}