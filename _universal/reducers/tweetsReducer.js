import { GET_TWEETS } from 'constants/actionTypes';
import getAsyncState from 'modules/getAsyncState';

const INITIAL_STATE = null;

export default function tweetsReducer (state = INITIAL_STATE, action) {

	/* eslint-disable indent */
	switch (action.type) {

		case GET_TWEETS: {
			return getAsyncState(action, state);
		}
		default: {
			return state;
		}
	}

	/* eslint-enable */
}
