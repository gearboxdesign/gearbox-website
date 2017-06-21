'use strict';

module.exports = {
	'extends': [
		'gearbox-stylelint'
	].map(require.resolve),
	'rules': {
		'no-unsupported-browser-features': null,
		// TODO: Update to latest version of stylelint to see if this resolves false positives.
		'selector-max-compound-selectors': null
	}
};
