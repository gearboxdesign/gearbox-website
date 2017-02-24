import { get, omit } from 'lodash';

// TODO: Implement session storage for client side, perhaps in another aliased file.
// TODO: Introduce time based expiration for server side.
export default function createViewModelStore (initialState = {}) {

	let viewModel = initialState;

	function getStoreValue (key) {

		if (key) {
			return get(viewModel, key);
		}

		return viewModel;
	}

	function setStoreValue (key, value) {

		viewModel = Object.assign({}, viewModel, {
			[key]: value
		});

		return value;
	}

	function consumeStoreValue (key) {

		const value = get(viewModel, key);

		viewModel = omit(viewModel, key);

		return value;
	}

	function clearStore () {

		viewModel = {};
	}

	return {
		clear: clearStore,
		consume: consumeStoreValue,
		get: getStoreValue,
		set: setStoreValue
	};
}