import { get } from 'lodash';
import { CLEAR_CONTENT, GET_PROJECT, GET_PROJECTS } from 'constants/actionTypes';
import projectReducer from 'reducers/projectReducer';
import getAsyncState from 'modules/getAsyncState';

const INITIAL_STATE = null;

export default function projectsReducer (state = INITIAL_STATE, action) {

	const { data, error, type, slug } = action,
		stateData = get(state, 'data', null);

	/* eslint-disable indent */
	switch (type) {

		case GET_PROJECTS: {

			const asyncData = data ? data.reduce((projects, project) => {

				const { slug: projectSlug } = project;

				return Object.assign({}, projects, {
					[projectSlug]: getAsyncState({ data: project }, get(stateData, projectSlug), true)
				});

			}, {}) : null;

			return getAsyncState({
				data: asyncData ? Object.assign({}, stateData, asyncData) : stateData,
				error
			}, state);
		}
		case GET_PROJECT: {

			if (!slug) {
				return state;
			}

			return getAsyncState({
				data: Object.assign({}, stateData, {
					[slug]: projectReducer(get(stateData, slug), action)
				})
			}, state);
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
