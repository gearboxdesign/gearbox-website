'use strict';

const getPageViewModel = require('lib/getPageViewModel'),
	linkEntryTransformer = require('lib/linkEntryTransformer');

module.exports.get = function get (app) {

	return (req, res, next) => {

		const { params: { id: entryId } } = req;

		return getPageViewModel({
			entryTransformers: [linkEntryTransformer(app.get('siteMap').dictionary)]
		})(entryId)
			.then((data) => {
				return res.status(200).json(data);
			})
			.catch(next);
	};
};