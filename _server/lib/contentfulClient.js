'use strict';

const contentful = require('contentful');

module.exports = contentful.createClient({
	space: process.env.CONTENTFUL_SPACE_ID,
	accessToken: process.env.CONTENTFUL_API_KEY,
	host: process.env.CONTENTFUL_HOST
});