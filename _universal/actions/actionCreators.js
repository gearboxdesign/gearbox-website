import actionTypes from 'constants/actionTypes';

export function setExample (value) {

	return {
		type: actionTypes.EXAMPLE,
		value
	};
}