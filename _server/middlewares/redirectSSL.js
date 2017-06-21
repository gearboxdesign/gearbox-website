'use strict';

module.exports = function redirectSSL (req, res, next) {

	if (req.headers['x-forwarded-proto'] !== 'https') {

		return res.redirect(302, `https://${ req.hostname + req.originalUrl }`);
	}

	return next();
};