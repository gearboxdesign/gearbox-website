import actionTypes from 'constants/actionTypes';

const INITIAL_STATE = {};

export default function documentDataReducer (state = INITIAL_STATE, action) {

	/* eslint-disable indent */
	switch (action.type) {

		case actionTypes.SET_DOCUMENT_DATA: {
			return action.value;
		}
		default: {
			return state;
		}
	}

	/* eslint-enable */
}
