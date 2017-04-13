'use strict';

module.exports.post = function post (req, res, next) {

	// TODO: Implement nodemailer.
	// TODO: Translate reply.
	return res.status(200).json({
		responseText: 'Thanks!'
	});

	// return next(new Error('Failed!'));
};