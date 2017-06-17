'use strict';

const client = require('lib/contentfulClient'),
	getViewModel = require('lib/getViewModel'),
	logErrors = require('lib/logErrors'),
	resolveEntries = require('lib/resolveEntries'),
	linkEntryTransformer = require('lib/linkEntryTransformer');

const INCLUDE_DEPTH = 10;

module.exports.get = function get (app) {

	return (req, res, next) => {

		const { params: { id: entryId } } = req;

		if (!entryId) {
			throw new TypeError('Unable to create content model, "entryId" property must be a string.');
		}

		return client.getEntries({
			'content_type': 'page',
			'sys.id': entryId,
			'include': INCLUDE_DEPTH,
			'select': [
				'fields.components',
				'fields.includeInMainNavigation',
				'fields.includeInFooterNavigation',
				'fields.heading',
				'fields.openGraph',
				'fields.pageMeta',
				'fields.params',
				'fields.slug',
				'fields.template',
				'fields.title'
			].join(',')
		})
		.then(logErrors)
		.then(resolveEntries())
		.then(getViewModel({
			entryTransformers: [linkEntryTransformer(app.get('siteMap').dictionary)]
		}))
		.then((data) => {

			return res.status(200).json(data);
		})
		.catch(next);
	};
};