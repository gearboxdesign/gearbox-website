'use strict';

const translate = require('translations').translate;

module.exports = function missingRouteHandler (errorMessage = translate()('errors.types.404')) {

	return (req, res, next) => {

		const err = new Error(errorMessage);

		err.status = 404;

		return next(err);
	};
};
