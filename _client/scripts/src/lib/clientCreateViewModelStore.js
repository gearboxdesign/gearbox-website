import { get, omit } from 'lodash';

const CLIENT_STORAGE_KEY = 'gearbox',
	clientStorage = window.sessionStorage || window.localStorage;

export default function createViewModelStore (initialState = {}) {

	if (!clientStorage) {

		/* eslint-disable no-console */
		console.warn('No client storage options available, client caching will be disabled.');

		/* eslint-enable */
	}

	amendViewModel(initialState);

	function getViewModelValue (key) {

		if (key) {
			return get(getViewModel(), key);
		}

		return getViewModel();
	}

	function setViewModelValue (key, value) {

		amendViewModel({
			[key]: value
		});

		return value;
	}

	function consumeViewModelValue (key) {

		let value;

		if (key) {
			value = getViewModelValue(key);
		}

		clientStorage.setItem(CLIENT_STORAGE_KEY, JSON.stringify(omit(getViewModel(), key)));

		return value;
	}

	function amendViewModel (update) {

		if (clientStorage) {
			clientStorage.setItem(CLIENT_STORAGE_KEY, JSON.stringify(Object.assign({}, getViewModel(), update)));
		}
	}

	function clearViewModel () {

		if (clientStorage) {
			clientStorage.setItem(CLIENT_STORAGE_KEY, JSON.stringify({}));
		}
	}

	function getViewModel () {

		return clientStorage && JSON.parse(clientStorage.getItem(CLIENT_STORAGE_KEY));
	}

	return {
		clear: clearViewModel,
		consume: consumeViewModelValue,
		get: getViewModelValue,
		set: setViewModelValue
	};
}