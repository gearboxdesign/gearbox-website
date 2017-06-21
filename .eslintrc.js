'use strict';

module.exports = {
	'extends': [
		'gearbox-eslint',
		'gearbox-eslint/rules/es6',
		'gearbox-eslint/rules/node',
		'gearbox-eslint/rules/react'
	].map(require.resolve),
	'env': {
		'commonjs': true
	},
	'globals': {
		'Promise': true,
		'document': true,
		'window': true
	},
	'rules': {
		'strict': 0,
		'no-magic-numbers': [1, { 'ignore': [-1, 0, 1, 200, 302, 400, 403, 404, 500, 1000] }]
	}
};
