import { ERRORS } from 'constants/http';
import { SET_CLIENT_ERRORS } from 'constants/actionTypes';

const dev = process.env.NODE_ENV === 'development';

const INITIAL_STATE = null;

export default function exampleReducer (state = INITIAL_STATE, action) {

	const { type, err } = action;

	/* eslint-disable indent */
	switch (type) {

		case SET_CLIENT_ERRORS: {

			const statusCode = err.status || 0;

			return err.errors || [
				(dev && (err.message || err.toString())) ||
				ERRORS[statusCode.toString()]
			];
		}
		default: {
			return state;
		}
	}

	/* eslint-enable */
}
