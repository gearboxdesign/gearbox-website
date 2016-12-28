'use strict';

const { flatMapDeep, get, pick } = require('lodash'),
	entrySlugs = require('constants/entrySlugs'),
	client = require('lib/contentfulClient'),
	logErrors = require('lib/logErrors'),
	resolveEntries = require('lib/resolveEntries');

function getSiteMapModel (entriesData) {

	const siteMapTree = getSiteMapTree(entriesData);

	return {
		tree: siteMapTree,
		dictionary: getSiteMapDictionary({}, siteMapTree)
	};
}

function getSiteMapTree (entriesData) {

	const indexData = get(entriesData, 'items[0]');

	return indexData ? getSiteMapTreeItem()(indexData) : {};
}

function getSiteMapTreeItem (breadcrumb) {

	return ({ sys = {}, fields = {} }) => {

		const { id } = sys,
			{ childPages, includeInMainNavigation, includeInFooterNavigation, params, slug, title, template } = fields,
			updatedBreadcrumb = breadcrumb ? breadcrumb.concat(slug) : [];

		return {
			childPages: childPages ? childPages.map(getSiteMapTreeItem(updatedBreadcrumb)) : [],
			id,
			includeInMainNavigation,
			includeInFooterNavigation,
			params,
			slug,
			template,
			title,
			url: `/${ updatedBreadcrumb.join('/') }`
		};
	};
}

function getSiteMapDictionary (dictionary, siteMapTreeNode) {

	const { childPages, id, slug } = siteMapTreeNode;

	if (!slug) {
		throw new Error(`No slug property exists for page "${ id }".`);
	}

	return Object.assign({}, dictionary, {
		[slug]: pick(siteMapTreeNode, ['id', 'title', 'url'])
	}, childPages && childPages.reduce(getSiteMapDictionary, {}));
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