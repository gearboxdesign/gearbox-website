import { GET_PAGE } from 'constants/actionTypes';

const INITIAL_STATE = null;

export default function pageReducer (state = INITIAL_STATE, action) {

	const { type, value } = action;

	/* eslint-disable indent */
	switch (type) {

		case GET_PAGE: {
			return value;
		}
		default: {
			return state;
		}
	}

	/* eslint-enable */
}
