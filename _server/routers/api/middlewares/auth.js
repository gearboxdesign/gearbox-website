'use strict';

const basicAuth = require('basic-auth');

function basic (req, res, next) {

	const credentials = basicAuth(req);

	if (credentials) {

		const { name, pass } = credentials;

		if (name === process.env.WEBHOOKS_AUTH_USER && pass === process.env.WEBHOOKS_AUTH_PASS) {
			return next();
		}
	}

	const err = new Error('Webhook access denied.');
	err.status = 401;

	return next(err);
}

module.exports = {
	basic 
};
