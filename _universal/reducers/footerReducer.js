import { GET_FOOTER } from 'constants/actionTypes';

const INITIAL_STATE = null;

export default function footerReducer (state = INITIAL_STATE, action) {

	const { type, value } = action;

	/* eslint-disable indent */
	switch (type) {

		case GET_FOOTER: {
			return value;
		}
		default: {
			return state;
		}
	}

	/* eslint-enable */
}
