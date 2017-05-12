import { get, omit } from 'lodash';

export default function createViewModelStore (initialState = {}) {

	let viewModel = {};

	amendViewModel(initialState);

	function amendViewModel (update) {

		viewModel = Object.assign({}, viewModel, update);
	}

	function clearViewModel () {

		viewModel = {};
	}

	function consumeViewModelValue (key) {

		let value;

		if (key) {
			value = getViewModelValue(key);
			viewModel = omit(viewModel, key);
		}
		else {
			value = getViewModel();
			clearViewModel();
		}

		return value;
	}

	function getViewModel () {

		return viewModel;
	}

	function getViewModelValue (key) {

		if (key) {
			return get(viewModel, key);
		}

		return viewModel;
	}

	function setViewModelValue (key, value) {

		amendViewModel({
			[key]: value
		});

		return value;
	}

	return {
		clear: clearViewModel,
		consume: consumeViewModelValue,
		get: getViewModelValue,
		set: setViewModelValue
	};
}