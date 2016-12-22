'use strict';

module.exports = function apiMissingRouteHandler (req, res, next) {

	const err = new Error('No API route found.');
	err.status = 404;

	return next(err);
};
