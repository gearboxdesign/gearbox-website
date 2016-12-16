import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { reduce } from 'lodash';
import routeReady from 'reducers/routeReadyReducer';

export default function (initialState = {}, initialReducers = {}) {

	let reducers = Object.assign({
		routeReady
	}, initialReducers);

	return Object.create(getStore(initialState, reducers), {
		registerReducers: {
			value (newReducers) {

				reducers = {
					...reducers,
					...newReducers
				};
				this.replaceReducer(combineReducers({ ...reducers }));
			}
		},
		getReducerNames: {
			value () {

				return reduce(reducers, (reducerNames, value, key) => {

					return Object.assign({}, reducerNames, {
						[key]: value.name
					});

				}, {});
			}
		}
	});
}

function getStore (initialState = {}, initialReducers = {}) {

	const middleware = [thunk];

	if (process.env.CLIENT && process.env.NODE_ENV === 'development') {
		middleware.push(createLogger());
	}

	const store = createStore(
		combineReducers(initialReducers),
		initialState,
		applyMiddleware(...middleware)
	);

	return store;
}