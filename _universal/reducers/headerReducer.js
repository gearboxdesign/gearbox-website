import { CLEAR_CONTENT, GET_HEADER } from 'constants/actionTypes';

const INITIAL_STATE = null;

export default function headerReducer (state = INITIAL_STATE, action) {

	const { type, value } = action;

	/* eslint-disable indent */
	switch (type) {

		case GET_HEADER: {
			return value;
		}
		case CLEAR_CONTENT: {
			return INITIAL_STATE;
		}
		default: {
			return state;
		}
	}

	/* eslint-enable */
}
