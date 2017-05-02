import { SET_PROJECT, SET_PROJECTS } from 'constants/actionTypes';
import getAsyncState from 'modules/getAsyncState';

const INITIAL_STATE = null;

export default function projectsReducer (state = INITIAL_STATE, action) {

	/* eslint-disable indent */
	switch (action.type) {

        case SET_PROJECT:
		case SET_PROJECTS: {
			return getAsyncState(action, state);
		}
		default: {
			return state;
		}
	}

	/* eslint-enable */
}
