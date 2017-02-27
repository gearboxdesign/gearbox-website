import { get } from 'lodash';

const CLIENT_STORAGE_KEY = 'gearbox',
	clientStorage = window.sessionStorage || window.localStorage;

export default function createViewModelStore (initialState = {}) {

	if (!clientStorage) {

		/* eslint-disable no-console */
		console.warn('No client storage options available, client caching will be disabled.');

		/* eslint-enable */
	}

	updateViewModel(initialState);

	function getViewModelValue (key) {

		if (key) {
			return get(getViewModel(), key);
		}

		return getViewModel();
	}

	function setViewModelValue (key, value) {

		updateViewModel({
			[key]: value
		});

		return value;
	}

	function clearViewModel () {

		if (clientStorage) {
			clientStorage.setItem(CLIENT_STORAGE_KEY, JSON.stringify({}));
		}
	}

	function getViewModel () {

		return clientStorage && JSON.parse(clientStorage.getItem(CLIENT_STORAGE_KEY));
	}

	function updateViewModel (update) {

		if (clientStorage) {
			clientStorage.setItem(CLIENT_STORAGE_KEY, JSON.stringify(Object.assign({}, getViewModel(), update)));
		}
	}

	return {
		clear: clearViewModel,
		get: getViewModelValue,
		set: setViewModelValue
	};
}