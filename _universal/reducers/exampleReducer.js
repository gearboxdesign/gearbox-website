import { EXAMPLE } from 'constants/actionTypes';

const INITIAL_STATE = 0;

export default function exampleReducer (state = INITIAL_STATE, action) {

	const { type, value } = action;

	/* eslint-disable indent */
	switch (type) {

		case EXAMPLE: {
			return value || state;
		}
		default: {
			return state;
		}
	}

	/* eslint-enable */
}
