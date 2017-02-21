'use strict';

const { upperFirst } = require('lodash');

module.exports = function getComponent (componentId) {

	if (!componentId) {
		return Promise.reject(new Error('Cannot load module, componentId is undefined.'));
	}

	try {
		return Promise.resolve(require(`containers/${ upperFirst(componentId) }Container`).default); // eslint-disable-line global-require, max-len
	}
	catch (containerErr) {

		try {
			return Promise.resolve(require(`components/${ upperFirst(componentId) }`).default); // eslint-disable-line global-require, max-len
		}
		catch (componentErr) {
			return Promise.resolve(require(`components/${ upperFirst(componentId) }/index`).default); // eslint-disable-line global-require, max-len
		}

	}
};