import { SET_DOCUMENT_DATA } from 'constants/actionTypes';

// TODO: Change this to null.
const INITIAL_STATE = {};

export default function documentDataReducer (state = INITIAL_STATE, action) {

	/* eslint-disable indent */
	switch (action.type) {

		case SET_DOCUMENT_DATA: {
			return action.value;
		}
		default: {
			return state;
		}
	}

	/* eslint-enable */
}
