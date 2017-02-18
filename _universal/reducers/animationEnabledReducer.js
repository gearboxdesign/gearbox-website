import actionTypes from 'constants/actionTypes';

const INITIAL_STATE = false;

export default function animationEnabledReducer (state = INITIAL_STATE, action) {

	/* eslint-disable indent */
	switch (action.type) {

		case actionTypes.LOAD_ROUTE: {
			return true;
		}
		default: {
			return state;
		}
	}

	/* eslint-enable */
}
