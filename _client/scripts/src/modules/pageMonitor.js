import { get, isFunction, pick } from 'lodash';

function updateDocument (data = {}) {

	const { title, openGraph, pageMeta } = data;

	document.title = title ? `Gearbox Design | ${ title }` : 'Gearbox Design';

	document.querySelectorAll('meta[property*="og"]').forEach(setOpenGraphData(openGraph,
		document.location.href,
		(key, value) => {
			return (key === 'image' && get(value, 'url')) || value;
		}));

	document.querySelectorAll('meta[name]').forEach(setPageMetaData(pageMeta));
}

function updateWindow (ready) {

	if (ready) {
		window.scroll(0, 0);
	}
}

function getUpdater (newState, prevState) {

	return (fn, propKeys = []) => {

		const statePropKeys = Array.isArray(propKeys) ? propKeys : [propKeys],
			stateUpdated = statePropKeys.reduce((performUpdate, propKey) => {
				return performUpdate || get(newState, propKey) !== get(prevState, propKey);
			}, false);

		if (stateUpdated) {

			if (statePropKeys.length === 1) {

				const propKey = statePropKeys[0];

				fn(get(newState, propKey), get(prevState, propKey));
			}
			else {
				fn(pick(newState, statePropKeys), pick(prevState, statePropKeys));
			}
		}
	};
}

function setOpenGraphData (data, url, valueTransform) {

	return (node) => {

		const match = /^og:(\w+)$/gi.exec(node.getAttribute('property')),
			key = Array.isArray(match) && match[1],
			value = isFunction(valueTransform) ? valueTransform(key, get(data, key, '')) : get(data, key, '');

		if (key === 'url') {
			node.setAttribute('content', url);
		}
		else if (value) {
			node.setAttribute('content', value);
		}
	};
}

function setPageMetaData (data) {

	return (node) => {

		const key = node.getAttribute('name'),
			value = get(data, key, '');

		if (value) {
			node.setAttribute('content', value);
		}
	};
}

export default function pageMonitor (initialState) {

	let currentState = initialState;

	return (getState) => {

		const newState = getState(),
			update = getUpdater(newState, currentState);

		update(updateDocument, 'document');
		update(updateWindow, 'routeReady');

		currentState = newState;
	};
}