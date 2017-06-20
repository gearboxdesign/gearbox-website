import { CLEAR_CONTENT, GET_FOOTER } from 'constants/actionTypes';
import getAsyncState from 'modules/getAsyncState';

const INITIAL_STATE = null;

export default function footerReducer (state = INITIAL_STATE, action) {

	const { type } = action;

	/* eslint-disable indent */
	switch (type) {

		case GET_FOOTER: {
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
