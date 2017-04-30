import { get } from 'lodash';

export default function getAsyncState (action, prevState) {

	const data = get(action, 'data'),
		errors = get(action, 'errors'),
		prevData = get(prevState, 'data'),
		prevErrors = get(prevState, 'errors');

	return {
		loading: !(data || errors),
		data: data || (errors ? null : prevData),
		errors: errors || (data ? null : prevErrors)
	};
}