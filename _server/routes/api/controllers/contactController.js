'use strict';

const logger = require('utils/logger'),
	nodemailer = require('nodemailer'),
	translate = require('translations').translate;

const transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: process.env.MAILER_USER,
		pass: process.env.MAILER_PASSWORD
	}
});

module.exports.post = function post (req, res, next) {

	const { email, lang, name, message } = req.body;

	transporter.sendMail({
		from: email,
		to: 'matt@gearboxdesign.co.uk',
		subject: `New Message from ${ name } <${ email }>`,
		text: message,
		html: `<p>${ message }</p>`
	})
		.then((data) => {

			const { envelope: { from }, messageId } = data;

			logger.info(`Email successfully sent from ${ from }, messageId: ${ messageId }`);

			return res.status(200).json({
				text: translate(lang)('contact.reply')
			});
		})
		.catch(next);
};