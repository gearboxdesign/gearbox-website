'use strict';

const getRouteLang = require('lib/getRouteLang').default;

module.exports = function languageDetector (req, res, next) {

	const { url } = req,
		lang = getRouteLang(url);

	res.locals.lang = lang;

	return next();
};