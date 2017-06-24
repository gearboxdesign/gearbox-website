import { get, merge } from 'lodash';

export default function getAsyncState (action, prevState, mergeState = false) {

	const data = get(action, 'data', null),
		errors = get(action, 'errors', null),
		loading = get(action, 'loading'),
		status = get(action, 'status', null),
		prevData = get(prevState, 'data', null),
		prevErrors = get(prevState, 'errors', null);

	return {
		data: (data && (mergeState ? merge({}, prevData, data) : data)) || prevData,
		errors: errors || (data ? null : prevErrors),
		status,
		loading: !!loading
	};
}