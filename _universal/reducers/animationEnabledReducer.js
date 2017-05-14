import { ENABLE_ANIMATIONS } from 'constants/actionTypes';

const INITIAL_STATE = false;

export default function animationEnabledReducer (state = INITIAL_STATE, action) {

	const { type } = action;

	/* eslint-disable indent */
	switch (type) {

		case ENABLE_ANIMATIONS: {
			return true;
		}
		default: {
			return state;
		}
	}

	/* eslint-enable */
}
