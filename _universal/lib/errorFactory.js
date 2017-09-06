'use strict';

const { isArray, isNumber } = require('lodash');

module.exports.createError = function createError (message, options = {}) {

	const { status, errors } = options,
		err = new Error(message);

	if (status) {

		if (isNumber(status)) {
			err.status = status;
		}
		else {
			throw new TypeError('Error "status" property must be a number');
		}
	}

	if (errors) {

		if (isArray(errors)) {
			err.errors = errors;
		}
		else {
			throw new TypeError('Error "errors" must be an array');
		}
	}

	return err;
};
