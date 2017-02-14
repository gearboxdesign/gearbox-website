'use strict';

const upperFirst = require('lodash/upperFirst');

module.exports = function getTemplate (componentId) {

	// TODO: Try System.import for client side code splitting, (under process.env.CLIENT conditional).
	if (!componentId) {
		throw new Error('Cannot load module, componentId is undefined.');
	}

	try {
		return require(`containers/${ upperFirst(componentId) }Container`).default; // eslint-disable-line global-require, max-len
	}
	catch (containerErr) {

		try {
			return require(`components/${ upperFirst(componentId) }`).default; // eslint-disable-line global-require, max-len
		}
		catch (componentErr) {
			return require(`components/${ upperFirst(componentId) }/index`).default; // eslint-disable-line global-require, max-len
		}

	}
};