import { partial, reduce } from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from 'routes';
import configureStore from 'stores/configureStore';
import pageMonitor from 'modules/pageMonitor';

const reducers = reduce(window.STORE_REDUCERS, getReducers, {}),
	store = configureStore(Object.assign({}, 
		window.STORE_STATE, 
		['pages'].reduce(getSessionState, {})
	), reducers);

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

function getSessionState (sessionState, key) {

	if (window.sessionStorage) {

		const storedItem = window.sessionStorage.getItem(key);

		return storedItem ? Object.assign({}, sessionState, {
			[key]: JSON.parse(storedItem)
		}) : sessionState;
	}

	return sessionState;
}