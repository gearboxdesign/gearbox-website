import { CLEAR_CONTENT, GET_PROJECT } from 'constants/actionTypes';

const INITIAL_STATE = null;

export default function currentProjectSlugReducer (state = INITIAL_STATE, action) {

	const { slug, type } = action;

	/* eslint-disable indent */
	switch (type) {

		case GET_PROJECT: {
			return slug;
		}
		case CLEAR_CONTENT: {
			return INITIAL_STATE;
		}
		default: {
			return state;
		}
	}

	/* eslint-enable */
}
