'use strict';

const { get } = require('lodash'),
	client = require('lib/contentfulClient'),
	createViewModel = require('lib/createViewModel'),
	logErrors = require('lib/logErrors'),
	resolveEntries = require('lib/resolveEntries');

module.exports = function getPageViewModel (options = {}) {

	const { includeDepth = 10, entryTransformers = [] } = options; // eslint-disable-line no-magic-numbers

	function prependSelectFieldsPath (fieldId) {
		return `fields.${ fieldId }`;
	}

	function getViewModel (entriesData) {

		return createViewModel(get(entriesData, 'items[0]'), {
			entryTransformers
		});
	}

	return (entryId) => {

		if (!entryId) {
			throw new Error('Unable to create content model, no entryId has been provided.');
		}

		return client.getEntries({
			'content_type': 'page',
			'sys.id': entryId,
			'include': includeDepth,
			'select': [
				'components',
				'includeInMainNavigation',
				'includeInFooterNavigation',
				'heading',
				'openGraph',
				'pageMeta',
				'params',
				'slug',
				'template',
				'title'
			].map(prependSelectFieldsPath).join(',')
		})
		.then(logErrors)
		.then(resolveEntries())
		.then(getViewModel);
	};
};