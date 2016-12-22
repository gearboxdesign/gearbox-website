'use strict';

const { get } = require('lodash'),
	client = require('lib/contentfulClient'),
	createViewModel = require('lib/createViewModel'),
	logErrors = require('lib/logErrors'),
	resolveEntries = require('lib/resolveEntries');

const LINK_COMPONENT = 'link';

module.exports = function getPageViewModel (sitemap, options = {}) {

	const { includeDepth = 10 } = options; // eslint-disable-line no-magic-numbers

	function prependSelectFieldsPath (fieldId) {

		return `fields.${ fieldId }`;
	}

	function getViewModel (entriesData) {

		return createViewModel(get(entriesData, 'items[0]'), {
			entryTransform
		});
	}

	// TODO: Tidy this and extend if necessary, consider converting to switch.
	function entryTransform (viewModel) {

		const componentId = get(viewModel, 'meta.componentId');

		if (componentId === LINK_COMPONENT) {

			const { pageSlug } = viewModel;

			// TODO: Lookup on view model and retrieve correct url.
			return Object.assign({
				url: pageSlug
			}, viewModel);
		}

		return viewModel;
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
	};
};