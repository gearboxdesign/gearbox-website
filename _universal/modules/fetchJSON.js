/* global navigator */

import { merge } from 'lodash';
import fetch from 'isomorphic-fetch';
import { createError } from 'lib/errorFactory';

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

		if (navigator && !navigator.onLine) {

			return Promise.reject(createError('Navigator Offline', {
				status: -1
			}));
		}
	}

	return fetch(url, opts).then((response) => {

		return response.json().then((json) => {

			return response.ok ? json : Promise.reject(createError(response.statusText, {
				errors: json.errors,
				status: response.status
			}));

		}, (error) => {
			return Promise.reject(createError(`JSON Error: ${ error.message }`));
		});

	}, (error) => {
		return Promise.reject(createError(`Fetch Error: ${ error.message }`));
	});
}