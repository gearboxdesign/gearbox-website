import actionTypes from 'constants/actionTypes';

const INITIAL_STATE = true;

export default function routeReadyReducer (state = INITIAL_STATE, action) {

	/* eslint-disable indent */
	switch (action.type) {

		case actionTypes.LOAD_ROUTE: {
			return action.loaded;
		}
		default: {
			return state;
		}
	}

	/* eslint-enable */
}
