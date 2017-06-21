const { get, partial } = require('lodash'),
	{ DEFAULT_LANGUAGE, LANGUAGE_CODES } = require('constants/translations');

const LANGUAGE_DATA = LANGUAGE_CODES.reduce((langDict, currentLang) => {

	return Object.assign({}, langDict, {
		[currentLang]: require(`./${ currentLang }.json`) // eslint-disable-line global-require
	});

}, {});

module.exports = function translations (lang) {

	return LANGUAGE_DATA[lang] || LANGUAGE_DATA[DEFAULT_LANGUAGE];
};

module.exports.translate = function translate (lang) {

	return partial(get, LANGUAGE_DATA[lang] || LANGUAGE_DATA[DEFAULT_LANGUAGE]);
};