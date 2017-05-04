import {
	EXAMPLE,
	ENABLE_ANIMATIONS,
	GET_TWEETS,
	LOAD_ROUTE,
	SET_DOCUMENT_DATA,
	SET_CURRENT_PROJECT_SLUG,
	GET_PROJECT,
	GET_PROJECTS,
	TOGGLE_NAV
} from 'constants/actionTypes';
import { PROJECTS, TWEETS } from 'constants/apiUrls';
import fetchAction from 'actions/lib/fetchAction';

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

export function setCurrentProjectSlug (slug) {

	return {
		type: SET_CURRENT_PROJECT_SLUG,
		slug
	};
}


export function setDocumentData (value) {

	return {
		type: SET_DOCUMENT_DATA,
		value
	};
}

export function getProject (id) {

	return (dispatch) => {

		const action = {
			type: GET_PROJECT,
			slug: id
		};

		return fetchAction(dispatch, action)(`${ PROJECTS }/${ id }?features=1`, {
			method: 'get'
		});
	};
}

export function getProjects () {

	return (dispatch) => {

		const action = {
			type: GET_PROJECTS
		};

		return fetchAction(dispatch, action)(PROJECTS, {
			method: 'get'
		});
	};
}

export function toggleNav (value) {

	return {
		type: TOGGLE_NAV,
		value
	};
}