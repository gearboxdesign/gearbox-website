import { get, merge } from 'lodash';

export default function getAsyncState (action, prevState, mergeState = false) {

	const data = get(action, 'data'),
		errors = get(action, 'errors'),
		prevData = get(prevState, 'data'),
		prevErrors = get(prevState, 'errors');

	return {
		loading: !(data || errors),
		// data: (mergeState ? merge({}, prevData, data) : data) || (errors ? null : prevData),
		data: (data && (mergeState ? merge({}, prevData, data) : data)) || (errors ? null : prevData),
		errors: errors || (data ? null : prevErrors)
	};
}