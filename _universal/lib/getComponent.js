'use strict';

const upperFirst = require('lodash/upperFirst');

module.exports = function getComponent (componentId) {

	if (!componentId) {
		throw new Error('Cannot load module, componentId is undefined.');
	}

	try {
		return require(`containers/base/${ upperFirst(componentId) }Container`).default; // eslint-disable-line global-require, max-len
	}
	catch (containerErr) {

		try {
			return require(`components/base/${ upperFirst(componentId) }`).default; // eslint-disable-line global-require, max-len
		}
		catch (componentErr) {
			return require(`components/base/${ upperFirst(componentId) }/index`).default; // eslint-disable-line global-require, max-len
		}

	}
};