import { CLEAR_CONTENT, GET_HEADER } from 'constants/actionTypes';
import getAsyncState from 'modules/getAsyncState';

const INITIAL_STATE = null;

export default function headerReducer (state = INITIAL_STATE, action) {

	const { type } = action;

	/* eslint-disable indent */
	switch (type) {

		case GET_HEADER: {
			return getAsyncState(action, state);
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
