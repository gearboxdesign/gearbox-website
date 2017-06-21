'use strict';

module.exports = function setHeaders (headers) {

	return (req, res, next) => {

		res.set(headers);

		return next();
	};
};