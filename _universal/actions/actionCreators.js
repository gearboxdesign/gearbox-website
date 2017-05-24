import {
	EXAMPLE,
	ENABLE_ANIMATIONS,
	GET_FOOTER,
	GET_HEADER,
	GET_PAGE,
	GET_PROJECT,
	GET_PROJECTS,
	GET_TRANSLATIONS,
	GET_TWEETS,
	LOAD_ROUTE,
	SET_DOCUMENT,
	TOGGLE_NAV
} from 'constants/actionTypes';
import { get } from 'lodash';
import { PROJECTS, TWEETS } from 'constants/apiUrls';
import fetchAction from 'actions/lib/fetchAction';

// TODO: Split these into individual files.
export function setExample (value) {

	return {
		type: EXAMPLE,
		value
	};
}

export function enableAnimations () {

	return {
		type: ENABLE_ANIMATIONS
	};
}

export function getFooter (value) {

	return {
		type: GET_FOOTER,
		value
	};
}

export function getHeader (value) {

	return {
		type: GET_HEADER,
		value
	};
}

export function getPage (url, value) {

	return {
		type: GET_PAGE,
		url,
		value
	};
}

export function getProject (slug) {

	return (dispatch, getState) => {

		const action = {
			type: GET_PROJECT,
			slug
		};

		const cached = !!get(getState(), `projects.data.${ slug }.data.features`);

		if (!slug || cached) {
			return Promise.resolve(dispatch(action));
		}

		return fetchAction(dispatch, action)(`${ PROJECTS }/${ slug }?features=1`, {
			method: 'get'
		});
	};
}

export function getProjects () {

	return (dispatch, getState) => {

		const action = {
			type: GET_PROJECTS
		};

		const cached = !!get(getState(), 'projects.data');

		if (cached) {
			return Promise.resolve(dispatch(action));
		}

		return fetchAction(dispatch, action)(PROJECTS, {
			method: 'get'
		});
	};
}

export function getTranslations (value) {

	return {
		type: GET_TRANSLATIONS,
		value
	};
}

export function getTweets () {

	return (dispatch) => {

		const action = {
			type: GET_TWEETS
		};

		return fetchAction(dispatch, action)(TWEETS, {
			method: 'get'
		});
	};
}

export function loadRoute (loaded) {

	return {
		type: LOAD_ROUTE,
		loaded: !!loaded
	};
}

export function setDocument (value) {

	return {
		type: SET_DOCUMENT,
		value
	};
}

export function toggleNav (value) {

	return {
		type: TOGGLE_NAV,
		value
	};
}