import { get, merge } from 'lodash';

export default function getAsyncState (action, state, mergeState = false) {

	const actionData = get(action, 'data', null),
		actionError = get(action, 'error', null),
		loading = get(action, 'loading'),
		stateData = get(state, 'data', null),
		stateError = get(state, 'error', null);

	return {
		data: (actionData && (mergeState ? merge({}, stateData, actionData) : actionData)) || stateData,
		error: actionError || (actionData ? null : stateError),
		loading: !!loading
	};
}