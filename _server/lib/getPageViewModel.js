'use strict';

const { get, memoize } = require('lodash'),
	client = require('lib/contentfulClient'),
	createViewModel = require('lib/createViewModel'),
	logErrors = require('lib/logErrors'),
	resolveEntries = require('lib/resolveEntries');

const OPTIONS_DEFAULTS = {
	includeDepth: 10
};

// TODO: Rename (again) to createPageModel.
function getPageViewModel (entryId, options = {}) {

	if (!entryId) {
		throw new Error('Unable to create content model, no entryId has been provided.');
	}

	const mergedOptions = Object.assign({}, OPTIONS_DEFAULTS, options);

	return client.getEntries({
		'content_type': 'page',
		'sys.id': entryId,
		'include': mergedOptions.includeDepth,
		'select': [
			'title',
			'slug',
			'params',
			'template',
			'includeInMainNavigation',
			'includeInFooterNavigation',
			'heading',
			'components'
		].map(prependSelectFieldsPath).join(',')
	})
	.then(logErrors)
	.then(resolveEntries())
	.then(getViewModel);
}

function prependSelectFieldsPath (fieldId) {

	return `fields.${ fieldId }`;
}

function getViewModel (entriesData) {

	return createViewModel(get(entriesData, 'items[0]'));
}

// TODO: Consider replacing the default lodash caching resolver (memoize 2nd arg) to account for the second paramater.
module.exports = memoize(getPageViewModel);