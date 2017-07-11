'use strict';

const uuid = require('uuid');

module.exports = function nonce (req, res, next) {

	res.locals.nonce = uuid.v4();

	return next();
};