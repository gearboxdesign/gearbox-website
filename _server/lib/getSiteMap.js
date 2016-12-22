'use strict';

const { get } = require('lodash'),
	entrySlugs = require('constants/entrySlugs'),
	client = require('lib/contentfulClient'),
	logErrors = require('lib/logErrors'),
	resolveEntries = require('lib/resolveEntries');

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

function getSiteMapModel (entriesData) {

	const indexData = get(entriesData, 'items[0]');

	return indexData ? getSiteMapItem()(indexData) : {};
}

module.exports = function getSiteMap (options = {}) {

	const { includeDepth = 10 } = options; // eslint-disable-line no-magic-numbers

	return client.getEntries({
		'content_type': 'page',
		'fields.slug': entrySlugs.INDEX,
		'include': includeDepth
	})
	.then(logErrors)
	.then(resolveEntries({
		includeDepth
	}))
	.then(getSiteMapModel);
};