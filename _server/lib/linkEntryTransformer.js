'use strict';

const { get } = require('lodash');

const LINK_COMPONENT = 'link';

module.exports = function linkEntryTransformer (siteMapDictionary) {

	return (viewModel) => {

		const componentId = get(viewModel, 'meta.componentId');

		if (componentId === LINK_COMPONENT) {

			const { pageSlug, url } = viewModel;

			return Object.assign({
				url: url || get(siteMapDictionary, `${ pageSlug }.url`)
			}, viewModel);
		}

		return viewModel;
	};
};