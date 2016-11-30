'use strict';

const { get, memoize } = require('lodash'),
	client = require('lib/contentfulClient'),
	createViewModel = require('lib/createViewModel'),
	logErrors = require('lib/logErrors'),
	resolveEntries = require('lib/resolveEntries');

const OPTIONS_DEFAULTS = {
	includeDepth: 10
};

function createContentModel (entryId, options = {}) {

	if (!entryId) {
		throw new Error('Unable to create content model, no entryId has been provided.');
	}

	const mergedOptions = Object.assign({}, OPTIONS_DEFAULTS, options);

	/**
	 * TODO: If possible filter out childPages to avoid collecting unrequired data.
	 */
	return client.getEntries({
			'content_type': 'page',
			'sys.id': entryId,
			'include': mergedOptions.includeDepth
		})
		.then(logErrors)
		.then(resolveEntries())
		.then(getViewModel);
}

function getViewModel (entriesData) {

	return createViewModel(get(entriesData, 'items[0]'));
}

// TODO: Consider replacing the default lodash caching resolver (memoize 2nd arg) to account for the second paramater.
module.exports = memoize(createContentModel);