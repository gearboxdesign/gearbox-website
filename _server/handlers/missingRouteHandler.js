'use strict';

const httpErrors = require('constants/http').ERRORS;

module.exports = function missingRouteHandler (errorMessage = httpErrors[404]) {

	return (req, res, next) => {

		const err = new Error(errorMessage);
		err.status = 404;

		return next(err);
	};
};
