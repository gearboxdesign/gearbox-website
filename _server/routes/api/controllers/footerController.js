'use strict';

const client = require('lib/contentfulClient'),
	getViewModel = require('lib/getViewModel'),
	logErrors = require('lib/logErrors'),
	resolveEntries = require('lib/resolveEntries');

const INCLUDE_DEPTH = 10;

module.exports.get = function get (req, res, next) {

	return client.getEntries({
		'content_type': 'siteFooter',
		'include': INCLUDE_DEPTH
	})
		.then(logErrors)
		.then(resolveEntries())
		.then(getViewModel())
		.then((data) => {

			return res.status(200).json(data);
		})
		.catch(next);
};