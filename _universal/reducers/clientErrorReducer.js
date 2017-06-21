import { SET_CLIENT_ERROR } from 'constants/actionTypes';

const INITIAL_STATE = null;

export default function clientErrorReducer (state = INITIAL_STATE, action) {

	const { type, err } = action;

	/* eslint-disable indent */
	switch (type) {

		case SET_CLIENT_ERROR: {
			return err;
		}
		default: {
			return state;
		}
	}

	/* eslint-enable */
}
