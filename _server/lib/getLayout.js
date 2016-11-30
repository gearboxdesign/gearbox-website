'use strict';

// TODO: Remove if not longer necessary.
module.exports = function getLayout (templateId) {

	/* eslint-disable global-require */
	try {
		return require(`layouts/${ templateId }`).default;
	}
	catch (err) {
		return require('layouts/Default').default;
	}

	/* eslint-enable */
};