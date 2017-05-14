import { SET_DOCUMENT } from 'constants/actionTypes';

const INITIAL_STATE = null;

export default function documentReducer (state = INITIAL_STATE, action) {

	const { type, value } = action;

	/* eslint-disable indent */
	switch (type) {

		case SET_DOCUMENT: {
			return value || state;
		}
		default: {
			return state;
		}
	}

	/* eslint-enable */
}
