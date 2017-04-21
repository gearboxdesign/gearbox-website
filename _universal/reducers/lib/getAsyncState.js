import { pick } from 'lodash';

export default function getAsyncState (initialState, currentState, action) {

	const newState = Object.assign({},
		currentState,
		pick(action, ['data', 'errors', '_loading'])
	);

	return Object.keys(newState).length ? newState : initialState;
}