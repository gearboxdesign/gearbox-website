'use strict';

const getHeaderViewModel = require('lib/getHeaderViewModel');

module.exports.get = function get (req, res, next) {

	return getHeaderViewModel()
		.then((data) => {
			return res.status(200).json(data);
		})
		.catch(next);
};