'use strict';

const contentful = require('contentful');

const dev = process.env.NODE_ENV === 'development',
	client = contentful.createClient({
		space: process.env.CONTENTFUL_SPACE_ID,
		accessToken: dev ? process.env.CONTENTFUL_API_KEY,
		host: dev ? process.env.CONTENTFUL_HOST
	});

module.exports = client;