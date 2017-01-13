'use strict';

const { get } = require('lodash'),
	client = require('lib/contentfulClient'),
	createViewModel = require('lib/createViewModel'),
	logErrors = require('lib/logErrors'),
	resolveEntries = require('lib/resolveEntries');

module.exports = function getHeaderViewModel (options = {}) {

	const { includeDepth = 10, entryTransformers = [] } = options; // eslint-disable-line no-magic-numbers

	function getViewModel (entriesData) {

		return createViewModel(get(entriesData, 'items[0]'), {
			entryTransformers
		});
	}

	return client.getEntries({
		'content_type': 'siteHeader',
		'include': includeDepth
	})
	.then(logErrors)
	.then(resolveEntries())
	.then(getViewModel);
};