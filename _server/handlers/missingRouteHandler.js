'use strict';

const httpErrorConstants = require('constants/httpErrors');

module.exports = function missingRouteHandler (errorMessage = httpErrorConstants[404]) {

	return (req, res, next) => {

		const err = new Error(errorMessage);
		err.status = 404;

		return next(err);
	};
};
