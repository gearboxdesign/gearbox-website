'use strict';

module.exports = {
	'extends': [
		'gearbox-stylelint'
	].map(require.resolve),
	'rules': {
		'no-unsupported-browser-features': null
	}
};
