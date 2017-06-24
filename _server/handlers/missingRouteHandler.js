'use strict';

const { translate } = require('translations'),
	{ createError } = require('lib/errorFactory');

module.exports = function missingRouteHandler (errorMessage = translate()('errors.types.404')) {

	return (req, res, next) => {

		return next(createError(errorMessage, {
			status: 404
		}));
	};
};