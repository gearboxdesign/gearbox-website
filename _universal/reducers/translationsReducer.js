import { GET_TRANSLATIONS } from 'constants/actionTypes';

const INITIAL_STATE = null;

export default function translationsReducer (state = INITIAL_STATE, action) {

	const { type, value } = action;

	/* eslint-disable indent */
	switch (type) {

		case GET_TRANSLATIONS: {
			return value;
		}
		default: {
			return state;
		}
	}

	/* eslint-enable */
}
