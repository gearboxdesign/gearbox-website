'use strict';

const contentful = require('contentful');

const dev = process.env.NODE_ENV === 'development',
	client = contentful.createClient({
		space: process.env.CONTENTFUL_SPACE_ID,
		accessToken: process.env.CONTENTFUL_API_KEY,
		host: process.env.CONTENTFUL_HOST
	});

module.exports = client;