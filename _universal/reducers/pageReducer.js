import { GET_PAGE } from 'constants/actionTypes';
import getAsyncState from 'modules/getAsyncState';

const INITIAL_STATE = null;

export default function pageReducer (state = INITIAL_STATE, action) {

	const { type } = action;

	/* eslint-disable indent */
	switch (type) {

		case GET_PAGE: {
			return getAsyncState(action, state);
		}
		default: {
			return state;
		}
	}

	/* eslint-enable */
}
