'use strict';

const upperFirst = require('lodash/upperFirst');

module.exports = function getComponent (componentId) {

	if (!componentId) {
		throw new TypeError('Cannot load module, "componentId" argument must be a string.');
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