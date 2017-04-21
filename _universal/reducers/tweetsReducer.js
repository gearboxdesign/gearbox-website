import { GET_TWEETS } from 'constants/actionTypes';
import getAsyncState from 'reducers/lib/getAsyncState';

const INITIAL_STATE = null;

export default function tweetsReducer (state = INITIAL_STATE, action) {

	/* eslint-disable indent */
	switch (action.type) {

		case GET_TWEETS: {
            return getAsyncState(INITIAL_STATE, state, action);
		}
		default: {
			return state;
		}
	}

	/* eslint-enable */
}
