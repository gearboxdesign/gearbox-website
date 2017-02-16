import actionTypes from 'constants/actionTypes';

export function setExample (value) {

	return {
		type: actionTypes.EXAMPLE,
		value
	};
}

export function loadRoute (loaded) {

	return {
		type: actionTypes.LOAD_ROUTE,
		loaded: !!loaded
	};
}

export function setDocumentData (value) {

	return {
		type: actionTypes.SET_DOCUMENT_DATA,
		value
	};
}

export function toggleNav (value) {

	return {
		type: actionTypes.TOGGLE_NAV,
		value
	};
}
