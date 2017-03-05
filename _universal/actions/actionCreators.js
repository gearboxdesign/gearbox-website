import { EXAMPLE, ENABLE_ANIMATIONS, LOAD_ROUTE, SET_DOCUMENT_DATA, TOGGLE_NAV } from 'constants/actionTypes';

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

export function toggleNav (value) {

	return {
		type: TOGGLE_NAV,
		value
	};
}
