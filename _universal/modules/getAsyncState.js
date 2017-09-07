import { get, merge } from 'lodash';

export default function getAsyncState (action, prevState, mergeState = false) {

	const data = get(action, 'data', null),
		error = get(action, 'error', null),
		prevData = get(prevState, 'data', null),
		prevError = get(prevState, 'error', null);

	return {
		data: (data && (mergeState ? merge({}, prevData, data) : data)) || prevData,
		error: error || (data ? null : prevError),
		loading: !(data || error)
	};
}