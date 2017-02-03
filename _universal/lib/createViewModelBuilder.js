import { get, omit } from 'lodash';

// TODO: Improve and optimise this! Consider using Map potentially.
export default function createViewModelBuilder (initialState = {}) {

	let viewModel = initialState;

	function getModelValue (key) {

		if (key) {
			return get(viewModel, key);
		}

		return viewModel;
	}

	function setModelValue (key, value) {

		viewModel = Object.assign({}, viewModel, {
			[key]: value
		});

		return value;
	}

	function consumeModelValue (key) {

		const value = get(viewModel, key);

		viewModel = omit(viewModel, key);

		return value;
	}

	return {
		consume: consumeModelValue,
		get: getModelValue,
		set: setModelValue
	};
}