'use strict';

const contentful = require('contentful');

const dev = process.env.NODE_ENV === 'development',
	client = contentful.createClient({
		space: process.env.CONTENTFUL_SPACE_ID,
		accessToken: dev ? process.env.CONTENTFUL_PREVIEW_API_KEY : process.env.CONTENTFUL_PRODUCTION_API_KEY,
		host: dev ? process.env.CONTENTFUL_PREVIEW_HOST : process.env.CONTENTFUL_PRODUCTION_HOST
	});

module.exports = client;