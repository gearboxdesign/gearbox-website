import { ENABLE_ANIMATIONS } from 'constants/actionTypes';

const INITIAL_STATE = false;

export default function animationEnabledReducer (state = INITIAL_STATE, action) {

	/* eslint-disable indent */
	switch (action.type) {

		case ENABLE_ANIMATIONS: {
			return true;
		}
		default: {
			return state;
		}
	}

	/* eslint-enable */
}
