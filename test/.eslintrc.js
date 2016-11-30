'use strict';

module.exports = {
	'extends': [
		'gearbox-eslint',
		'gearbox-eslint/rules/node'
	].map(require.resolve),
	'env': {
		'commonjs': true,
		'mocha': true
	},
	'globals': {
		'Promise': true
	},
	'rules': {}
};
