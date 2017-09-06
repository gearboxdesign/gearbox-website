import { get, merge } from 'lodash';

export default function getAsyncState (state, prevState, mergeState = false) {

	const data = get(state, 'data', null),
		errors = get(state, 'errors', null),
		loading = get(state, 'loading'),
		status = get(state, 'status', null),
		prevData = get(prevState, 'data', null),
		prevErrors = get(prevState, 'errors', null);

	return {
		data: (data && (mergeState ? merge({}, prevData, data) : data)) || prevData,
		errors: errors || (data ? null : prevErrors),
		status,
		loading: !!loading
	};
}