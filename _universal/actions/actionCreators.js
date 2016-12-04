import actionTypes from 'constants/actionTypes';

export function setExample (value) {

	return {
		type: actionTypes.EXAMPLE,
		value
	};
}

export function setNavState (value) {

	return {
		type: actionTypes.SET_NAV_STATE,
		value
	};
}