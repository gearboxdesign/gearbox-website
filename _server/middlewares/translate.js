'use strict';

const { LANG_CODES } = require('translations');

module.exports = function translate (req, res, next) {

	const { params: { lang } } = req;

	if (lang && !LANG_CODES.includes(lang)) {
		return next(new Error('Invalid language.'));
	}

	req.lang = res.locals.lang = lang;

	return next();
};