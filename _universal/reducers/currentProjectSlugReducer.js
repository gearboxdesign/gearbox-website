import { SET_CURRENT_PROJECT_SLUG } from 'constants/actionTypes';

const INITIAL_STATE = null;

export default function currentProjectSlugReducer (state = INITIAL_STATE, action) {

	/* eslint-disable indent */
	switch (action.type) {

		case SET_CURRENT_PROJECT_SLUG: {
			return action.slug;
		}
		default: {
			return state;
		}
	}

	/* eslint-enable */
}
