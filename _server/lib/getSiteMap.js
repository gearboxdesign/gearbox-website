'use strict';

const { get, pick } = require('lodash'),
	{ flow: fFlow, get: fGet, find: fFind } = require('lodash/fp'),
	client = require('lib/contentfulClient'),
	logErrors = require('lib/logErrors'),
	resolveEntries = require('lib/resolveEntries');

const INDEX = 'index';

const findIndexEntry = fFlow(fGet('items'), fFind((item) => {
	return get(item, 'fields.slug') === INDEX;
}));

module.exports = function getSiteMap (options = {}) {

	const { includeDepth = 1 } = options; // eslint-disable-line no-magic-numbers

	return client.getEntries({
		'content_type': 'page',
		'include': includeDepth,
		'select': [
			'childPages',
			'includeInMainNavigation',
			'includeInFooterNavigation',
			'params',
			'slug',
			'template',
			'title'
		].map(prependSelectFieldsPath).join(',')
	})
	.then(logErrors)
	.then(resolveEntries({
		includeDepth
	}))
	.then()
	.then(getSiteMapModel);
};

function prependSelectFieldsPath (fieldId) {
	return `fields.${ fieldId }`;
}

function getSiteMapModel (entriesData) {

	const siteMapTree = getSiteMapTree(entriesData);

	return {
		tree: siteMapTree,
		dictionary: getSiteMapDictionary({}, siteMapTree)
	};
}

function getSiteMapTree (entriesData) {

	const indexData = findIndexEntry(entriesData);

	if (!indexData) {
		throw new Error('No index page entry found, unable to form a viable site map.');
	}

	return getSiteMapTreeItem()(indexData);
}

function getSiteMapTreeItem (breadcrumb) {

	return ({ sys = {}, fields = {} }) => {

		const { id } = sys,
			{ childPages, slug, ...restProps } = fields,
			updatedBreadcrumb = breadcrumb ? breadcrumb.concat(slug) : [];

		return {
			childPages: childPages ? childPages.map(getSiteMapTreeItem(updatedBreadcrumb)) : [],
			id,
			slug,
			url: `/${ updatedBreadcrumb.join('/') }`,
			...restProps
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