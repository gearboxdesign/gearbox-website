import { SET_DOCUMENT_DATA } from 'constants/actionTypes';

const INITIAL_STATE = null;

export default function documentDataReducer (state = INITIAL_STATE, action) {

	/* eslint-disable indent */
	switch (action.type) {

		case SET_DOCUMENT_DATA: {
			return action.value || state;
		}
		default: {
			return state;
		}
	}

	/* eslint-enable */
}
