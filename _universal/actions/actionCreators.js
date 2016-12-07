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

export function setNavState (value) {

	return {
		type: actionTypes.SET_NAV_STATE,
		value
	};
}
