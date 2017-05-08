import { GET_PROJECT } from 'constants/actionTypes';

const INITIAL_STATE = null;

export default function currentProjectSlugReducer (state = INITIAL_STATE, action) {

	/* eslint-disable indent */
	switch (action.type) {

		case GET_PROJECT: {
			return action.slug || state;
		}
		default: {
			return state;
		}
	}

	/* eslint-enable */
}
