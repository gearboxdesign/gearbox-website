import { LOAD_ROUTE, TOGGLE_NAV } from 'constants/actionTypes';

const INITIAL_STATE = false;

export default function navActiveReducer (state = INITIAL_STATE, action) {

	const { type, value } = action;

	/* eslint-disable indent */
	switch (type) {

		case TOGGLE_NAV: {
			return value;
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
