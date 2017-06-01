import { CLEAR_CONTENT, GET_TRANSLATIONS } from 'constants/actionTypes';

const INITIAL_STATE = null;

export default function translationsReducer (state = INITIAL_STATE, action) {

	const { type, value } = action;

	/* eslint-disable indent */
	switch (type) {

		case GET_TRANSLATIONS: {
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
