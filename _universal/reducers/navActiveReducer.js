import { LOAD_ROUTE, TOGGLE_NAV } from 'constants/actionTypes';

const INITIAL_STATE = false;

export default function navActiveReducer (state = INITIAL_STATE, action) {

	/* eslint-disable indent */
	switch (action.type) {

		case TOGGLE_NAV: {
			return action.value;
		}
		case LOAD_ROUTE: {
			return INITIAL_STATE;
		}
		default: {
			return state;
		}
	}

	/* eslint-enable */
}
