import { get, merge } from 'lodash';

export default function getAsyncState (action, prevState, mergeState = false) {

	const data = get(action, 'data', null),
		errors = get(action, 'errors', null),
		loading = get(action, 'loading'),
		prevData = get(prevState, 'data', null),
		prevErrors = get(prevState, 'errors', null);

	return {
		// data: (mergeState ? merge({}, prevData, data) : data) || (errors ? null : prevData),
		// data: (data && (mergeState ? merge({}, prevData, data) : data)) || (errors ? null : prevData),
		data: (data && (mergeState ? merge({}, prevData, data) : data)) || prevData,
		errors: errors || (data ? null : prevErrors),
		loading: !!loading
	};
}