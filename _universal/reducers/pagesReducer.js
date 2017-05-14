import { get } from 'lodash';
import { GET_PAGE } from 'constants/actionTypes';
import pageReducer from 'reducers/pageReducer';

const INITIAL_STATE = null;

const client = process.env.CLIENT;

export default function pagesReducer (state = INITIAL_STATE, action) {

	const { type, url } = action;

	/* eslint-disable indent */
	switch (type) {

		case GET_PAGE: {

			if (!url) {
				return state;
			}

			const newState = Object.assign({}, state, {
				[url]: pageReducer(get(state, url), action)
			});

			if (client) {

				if (window.sessionStorage) {
					window.sessionStorage.setItem('pages', JSON.stringify(newState));
				}
			}

			return newState;
		}
		default: {
			return state;
		}
	}

	/* eslint-enable */
}
