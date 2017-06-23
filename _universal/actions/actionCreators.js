import {
	EXAMPLE,
	GET_FOOTER,
	GET_HEADER,
	GET_PAGE,
	GET_PROJECT,
	GET_PROJECTS,
	GET_TRANSLATIONS,
	GET_TWEETS,
	LOAD_ROUTE,
	SET_CLIENT_ERROR,
	SET_DOCUMENT,
	CLEAR_CONTENT,
	TOGGLE_NAV
} from 'constants/actionTypes';
import { get } from 'lodash';
import { FOOTER, HEADER, PAGES, PROJECTS, TRANSLATIONS, TWEETS } from 'constants/apiUrls';
import fetchAction from 'actions/lib/fetchAction';

export function setExample (value) {

	return {
		type: EXAMPLE,
		value
	};
}

export function clearContent () {

	return {
		type: CLEAR_CONTENT
	};
}

export function getFooter () {

	return (dispatch, getState) => {

		const action = {
			type: GET_FOOTER
		};

		return fetchAction(dispatch, action)(`${ FOOTER }`, {
			method: 'get'
		});
	};
}

export function getHeader (value) {

	return (dispatch, getState) => {

		const action = {
			type: GET_HEADER
		};

		return fetchAction(dispatch, action)(`${ HEADER }`, {
			method: 'get'
		});
	};
}

export function getPage (key, routeId) {

	return (dispatch) => {

		const action = {
			type: GET_PAGE,
			key
		};

		return fetchAction(dispatch, action)(`${ PAGES }/${ routeId }`, {
			method: 'get'
		});
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

export function getTranslations (lang) {

	return (dispatch, getState) => {

		const translationsUrl = lang ? `${ TRANSLATIONS }/${ lang }` : TRANSLATIONS,
			action = {
				type: GET_TRANSLATIONS
			};

		return fetchAction(dispatch, action)(`${ translationsUrl }`, {
			method: 'get'
		});
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

export function setClientError (err) {

	return {
		type: SET_CLIENT_ERROR,
		err
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