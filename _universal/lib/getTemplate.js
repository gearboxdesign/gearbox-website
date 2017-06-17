'use strict';

const upperFirst = require('lodash/upperFirst');

module.exports = function getTemplate (template) {

	if (!template) {
		throw new TypeError('Cannot load module, "template" argument must be a string.');
	}

	try {
		return require(`templates/${ upperFirst(template) }`).default; // eslint-disable-line global-require, max-len
	}
	catch (templateErr) {
		return require(`templates/${ upperFirst(template) }/index`).default; // eslint-disable-line global-require, max-len
	}
};