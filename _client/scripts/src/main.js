// NOTE: Some additional direct imports may be required, e.g. Promise, test this against target browsers and verify runtime plugin is working correctly!
import { partial, reduce } from 'lodash';
import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from 'routes';
import configureStore from 'stores/configureStore';
import createViewModelStore from 'lib/createViewModelStore';
import pageMonitor from 'modules/pageMonitor';

const reducers = reduce(window.STORE_REDUCERS, getReducers, {}),
	store = configureStore(window.STORE_STATE, reducers),
	viewModelStore = createViewModelStore(window.VIEW_MODEL);

store.subscribe(partial(pageMonitor(store.getState()), store.getState));

ReactDOM.render(
	<Provider store={ store }>
		<Router
			history={ browserHistory }
			onError={ errorHandler }
			routes={ routes(store, window.SITE_MAP_TREE, viewModelStore) }
		/>
	</Provider>, document.querySelector('[data-app]')
);

function errorHandler (err) {

	// TODO: Implement error handling.
	console.log('err', err);
}

function getReducers (resolvedReducers, value, key) {

	return Object.assign({}, resolvedReducers, {
		[key]: require(`reducers/${ value }`).default // eslint-disable-line global-require
	});
}