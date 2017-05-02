'use strict';

const { _, get: lGet, partial } = require('lodash'),
	client = require('lib/contentfulClient'),
	getViewModel = require('lib/getViewModel'),
	createViewModel = require('lib/createViewModel'),
	logErrors = require('lib/logErrors'),
	resolveEntries = require('lib/resolveEntries');

const INCLUDE_DEPTH = 10;

module.exports.get = function get (req, res, next) {

	const { params: { slug }, query: { features } } = req;

	return client.getEntries({
		'content_type': 'project',
		'fields.slug': slug,
		'include': INCLUDE_DEPTH,
		'select': [
			'fields.agency',
			'fields.caption',
			'fields.description',
			'fields.heading',
			'fields.image',
			'fields.slug',
			'fields.url',
			'fields.title',
			'fields.tags'
		].concat(+features ? ['fields.features'] : []).join(',')
	})
	.then(logErrors)
	.then(resolveEntries())
	.then(slug ? getViewModel() : getViewModels())
	.then((data) => {

		return res.status(200).json(data);
	})
	.catch(next);
};

function getViewModels (options = {}) {

	return (entriesData) => {

		return lGet(entriesData, 'items', []).map(partial(createViewModel, _, options));
	};
}