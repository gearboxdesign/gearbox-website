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
		'Promise': true
	},
	'rules': {
		'strict': 0
	}
};
