'use strict';

const logger = require('utils/logger');

module.exports = function logErrors (entriesData) {

	if (entriesData.errors) {
		entriesData.errors.forEach(logger.error.bind(logger));
	}

	return entriesData;
};
