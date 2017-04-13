'use strict';

const getPageViewModel = require('lib/getPageViewModel'),
	linkEntryTransformer = require('lib/linkEntryTransformer');

module.exports.get = function get (app) {

	return (req, res, next) => {

		const { params: { id: entryId } } = req,
			successHandler = res.status(200);

		return getPageViewModel({
			entryTransformers: [linkEntryTransformer(app.get('siteMap').dictionary)]
		})(entryId)
			.then(successHandler.json.bind(successHandler))
			.catch(next);
	};
};