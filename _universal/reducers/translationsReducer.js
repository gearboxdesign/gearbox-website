import { GET_TRANSLATIONS } from 'constants/actionTypes';
import getAsyncState from 'modules/getAsyncState';

const INITIAL_STATE = null;

export default function translationsReducer (state = INITIAL_STATE, action) {

	const { type } = action;

	/* eslint-disable indent */
	switch (type) {

		case GET_TRANSLATIONS: {
			return getAsyncState(action, state);
		}
		default: {
			return state;
		}
	}

	/* eslint-enable */
}
