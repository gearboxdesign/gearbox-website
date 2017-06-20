'use strict';

const basicAuth = require('basic-auth');

module.exports.basic = function basic (authName, authPass) {

	return (req, res, next) => {

		const credentials = basicAuth(req);

		if (credentials) {

			const { name, pass } = credentials;

			if (name === authName && pass === authPass) {
				return next();
			}
		}

		const err = new Error('Access denied.');

		err.status = 401;

		return next(err);
	};
};