'use strict';

const upperFirst = require('lodash/upperFirst');

module.exports = function getTemplate (template) {

	// TODO: Try System.import for client side code splitting, (under process.env.CLIENT conditional).
	if (!template) {
		throw new Error('Cannot load module, template is undefined.');
	}

	try {
		return require(`templates/${ upperFirst(template) }`).default; // eslint-disable-line global-require, max-len
	}
	catch (templateErr) {
		return require(`templates/${ upperFirst(template) }/index`).default; // eslint-disable-line global-require, max-len
	}
};