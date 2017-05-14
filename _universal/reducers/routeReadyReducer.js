import { LOAD_ROUTE } from 'constants/actionTypes';

const INITIAL_STATE = true;

export default function routeReadyReducer (state = INITIAL_STATE, action) {

	const { loaded, type } = action;

	/* eslint-disable indent */
	switch (type) {

		case LOAD_ROUTE: {
			return loaded;
		}
		default: {
			return state;
		}
	}

	/* eslint-enable */
}
