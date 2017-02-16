'use strict';

module.exports = {
	'extends': [
		'gearbox-eslint',
		'gearbox-eslint/rules/es6'
	].map(require.resolve),
	'env': {
		'browser': true
	},
	'globals': {
		'Modernizr': true,
		'WeakMap': true
	},
	'rules': {}
};
