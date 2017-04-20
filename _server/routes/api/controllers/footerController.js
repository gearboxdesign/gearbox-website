'use strict';

const getFooterViewModel = require('lib/getFooterViewModel');

module.exports.get = function get (req, res, next) {

	return getFooterViewModel()
		.then((data) => {
			return res.status(200).json(data);
		})
		.catch(next);
};