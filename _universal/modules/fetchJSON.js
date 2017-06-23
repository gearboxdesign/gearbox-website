/* global navigator */

import { merge } from 'lodash';
import fetch from 'isomorphic-fetch';

const FETCH_DEFAULTS = {
	mode: 'cors',
	redirect: 'follow',
	credentials: 'same-origin'
};

export function getJSON (url, opts) {

	const fetchOpts = merge({}, opts);

	return request(url, merge({}, FETCH_DEFAULTS, {
		headers: {
			'Accept': 'application/json'
		},
		method: 'get',
		cache: 'default'
	}, fetchOpts));
}

export function sendJSON (url, opts) {

	const fetchOpts = merge({}, opts);

	return request(url, merge({}, FETCH_DEFAULTS, {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method: 'post'
	}, fetchOpts));
}

function request (url, opts) {

	if (process.env.CLIENT) {

		// TODO: Should return failed promise.
		if (navigator && !navigator.onLine) {

			const err = new Error('Navigator Offline');

			err.status = -1;

			return Promise.reject(err);
		}
	}

	return fetch(url, opts).then((fetchResponse) => {

		return fetchResponse.json().then((jsonResponse) => {

			return fetchResponse.ok ? jsonResponse : Promise.reject(Object.assign({
				status: fetchResponse.status
			}, jsonResponse));

		}, (err) => {

			console.error(err); // eslint-disable-line no-console

			throw new Error(`JSON Parse Error: ${ err.message }`);
		});

	}, (err) => {

		console.error(err); // eslint-disable-line no-console

		throw new Error(`Fetch Error: ${ err.message }`);
	});
}
