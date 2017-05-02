import {
	EXAMPLE,
	ENABLE_ANIMATIONS,
	GET_TWEETS,
	LOAD_ROUTE,
	SET_DOCUMENT_DATA,
	SET_PROJECT,
	SET_PROJECTS,
	TOGGLE_NAV
} from 'constants/actionTypes';
import { TWEETS } from 'constants/apiUrls';
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

export function setDocumentData (value) {

	return {
		type: SET_DOCUMENT_DATA,
		value
	};
}

export function setProject (value) {

	return {
		type: SET_PROJECT,
		value
	};
}

export function setProjects (value) {

	return {
		type: SET_PROJECTS,
		value
	};
}

export function toggleNav (value) {

	return {
		type: TOGGLE_NAV,
		value
	};
}