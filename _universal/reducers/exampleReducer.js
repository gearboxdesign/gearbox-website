import actionTypes from 'constants/actionTypes';

const INITIAL_STATE = 0;

export default function exampleReducer (state = INITIAL_STATE, action) {

	/* eslint-disable indent */
	switch (action.type) {

		case actionTypes.EXAMPLE: {
			return action.value;
		}
		default: {
			return state;
		}
	}

	/* eslint-enable */
}
