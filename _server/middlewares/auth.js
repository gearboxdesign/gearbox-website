'use strict';

const basicAuth = require('basic-auth'),
	{ createError } = require('lib/errorFactory');

module.exports.basic = function basic (authName, authPass) {

	return (req, res, next) => {

		const credentials = basicAuth(req);

		if (credentials) {

			const { name, pass } = credentials;

			if (name === authName && pass === authPass) {
				return next();
			}
		}

		return next(createError('Access denied.', {
			status: 401
		}));
	};
};