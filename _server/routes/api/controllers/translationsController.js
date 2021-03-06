'use strict';

const translations = require('translations');

module.exports.get = function get (req, res) {

	const { params: { lang } } = req;

	return res.status(200).json(translations(lang));
};