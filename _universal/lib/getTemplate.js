'use strict';

const upperFirst = require('lodash/upperFirst');

module.exports = function getTemplate (template) {

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