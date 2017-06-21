import { get } from 'lodash';
import { getJSON, sendJSON } from 'modules/fetchJSON';
import getAsyncState from 'modules/getAsyncState';

export default function fetchAction (dispatch, action) {

	return (url, opts = {}) => {

		dispatchLoadingAction(dispatch, action);

		const fn = opts.method === 'get' ? getJSON : sendJSON;

		return fn(url, opts)
			.then(dispatchSuccessAction(dispatch, action))
			.catch(dispatchFailedAction(dispatch, action));
	};
}

function dispatchLoadingAction (dispatch, action) {

	return dispatch(Object.assign({}, action, getAsyncState({ loading: true })));
}

function dispatchSuccessAction (dispatch, action) {

	return (data) => {

		return dispatch(
			Object.assign({},
				action, getAsyncState({
					data,
					loading: false
				}))
			);
	};
}

function dispatchFailedAction (dispatch, action) {

	return (err) => {

		return dispatch(
			Object.assign({},
				action, getAsyncState({
					errors: get(err, 'errors', [err.message]),
					loading: false
				})
			)
		);
	};
}