import { get } from 'lodash';

export default function createViewModelStore (initialState = {}) {

	let viewModel = {};

	updateViewModel(initialState);

	function getViewModelValue (key) {

		if (key) {
			return get(viewModel, key);
		}

		return viewModel;
	}

	function setViewModelValue (key, value) {

		updateViewModel({
			[key]: value
		});

		return value;
	}

	function clearViewModel () {

		viewModel = {};
	}

	function updateViewModel (update) {

		viewModel = Object.assign({}, viewModel, update);
	}

	return {
		clear: clearViewModel,
		get: getViewModelValue,
		set: setViewModelValue
	};
}