import { get } from 'lodash';
import { CLEAR_CONTENT, GET_PAGE } from 'constants/actionTypes';
import pageReducer from 'reducers/pageReducer';

const INITIAL_STATE = null;

export default function pagesReducer (state = INITIAL_STATE, action) {

	const { type, key } = action;

	/* eslint-disable indent */
	switch (type) {

		case GET_PAGE: {

			if (!key) {
				return state;
			}

			return Object.assign({}, state, {
				[key]: pageReducer(get(state, key), action)
			});
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
