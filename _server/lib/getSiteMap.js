'use strict';

const { get } = require('lodash'),
	entrySlugs = require('constants/entrySlugs'),
	client = require('lib/contentfulClient'),
	logErrors = require('lib/logErrors'),
	resolveEntries = require('lib/resolveEntries');

const OPTIONS_DEFAULTS = {
	includeDepth: 10
};

module.exports = function getSiteMap (options = {}) {

	const mergedOptions = Object.assign({}, OPTIONS_DEFAULTS, options);

	return client.getEntries({
		'content_type': 'page',
		'fields.slug': entrySlugs.INDEX,
		'include': mergedOptions.includeDepth
	})
	.then(logErrors)
	.then(resolveEntries(mergedOptions))
	.then(setSiteMapData);
};

function getSiteMapItem (breadcrumb) {

	return ({ sys = {}, fields = {} }) => {

		const { id } = sys,
			{ childPages, includeInMainNavigation, includeInFooterNavigation, params, slug, title, template } = fields,
			updatedBreadcrumb = breadcrumb ? breadcrumb.concat(slug) : [];

		return {
			childPages: childPages ? childPages.map(getSiteMapItem(updatedBreadcrumb)) : [],
			id,
			includeInMainNavigation,
			includeInFooterNavigation,
			params,
			template,
			title,
			url: `/${ updatedBreadcrumb.join('/') }`
		};
	};
}

function setSiteMapData (entriesData) {

	const indexData = get(entriesData, 'items[0]');

	return indexData ? getSiteMapItem()(indexData) : {};
}