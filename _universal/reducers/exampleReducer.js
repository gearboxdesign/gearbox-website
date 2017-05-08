import { EXAMPLE } from 'constants/actionTypes';

const INITIAL_STATE = 0;

export default function exampleReducer (state = INITIAL_STATE, action) {

	/* eslint-disable indent */
	switch (action.type) {

		case EXAMPLE: {
			return action.value || state;
		}
		default: {
			return state;
		}
	}

	/* eslint-enable */
}
