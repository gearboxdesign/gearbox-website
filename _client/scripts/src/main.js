import { reduce } from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from 'routes';
import configureStore from 'stores/configureStore';
import pageMonitor from 'modules/pageMonitor';

const reducers = reduce(window.STORE_REDUCERS, getReducers, {}),
	store = configureStore(window.STORE_STATE, reducers);

store.subscribe(pageMonitor(store.getState()).bind(null, store.getState));

ReactDOM.render(
	<Provider store={ store }>
		<Router
			history={ browserHistory }
			onError={ errorHandler }
			routes={ routes(store, window.SITE_MAP_TREE) }
		/>
	</Provider>, document.querySelector('[data-app]')
);

function errorHandler (err) {

	// TODO: Implement catch all error, perhaps a notification bar?
	console.log('err', err);
}

function getReducers (resolvedReducers, value, key) {

	return Object.assign({}, resolvedReducers, {
		[key]: require(`reducers/${ value }`).default // eslint-disable-line global-require
	});
}