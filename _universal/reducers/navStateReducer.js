import actionTypes from 'constants/actionTypes';

const INITIAL_STATE = false;

export default function navStateReducer (state = INITIAL_STATE, action) {

	/* eslint-disable indent */
	switch (action.type) {

		case actionTypes.SET_NAV_STATE: {
			return action.value;
		}
		default: {
			return state;
		}
	}

	/* eslint-enable */
}
