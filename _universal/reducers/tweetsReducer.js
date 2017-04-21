import { GET_TWEETS } from 'constants/actionTypes';

const INITIAL_STATE = [];

export default function tweetsReducer (state = INITIAL_STATE, action) {

	/* eslint-disable indent */
	switch (action.type) {

		case GET_TWEETS: {
			return action.value;
		}
		default: {
			return state;
		}
	}

	/* eslint-enable */
}
