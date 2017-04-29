'use strict';

const { get: lGet } = require('lodash'),
	{ get: fGet } = require('lodash/fp'),
	OAuth = require('oauth');

const SEARCH_API_URL = 'https://api.twitter.com/1.1/search/tweets.json',
	SEARCH_RESULT_LIMIT = 3,
	OAUTH_REQUEST_TOKEN_URL = 'https://api.twitter.com/oauth/request_token',
	OAUTH_ACCESS_TOKEN_URL = 'https://api.twitter.com/oauth/access_token',
	{
		TWITTER_API_KEY,
		TWITTER_API_SECRET,
		TWITTER_OAUTH_TOKEN,
		TWITTER_OAUTH_SECRET,
		TWITTER_USER
	} = process.env;

const oAuth = new OAuth.OAuth(
	OAUTH_REQUEST_TOKEN_URL, // Request Token URL
	OAUTH_ACCESS_TOKEN_URL, // Access Token URL
	TWITTER_API_KEY, // App API Key
	TWITTER_API_SECRET, // App API Secret
	'1.0A', // oAuth Version
	null, // Callback URL
	'HMAC-SHA1' // Signature Hash Method
);

module.exports.get = function get (req, res) {

	const query = encodeURIComponent(`from:${ encodeURIComponent(TWITTER_USER) }`);

	searchRequest(`${ SEARCH_API_URL }?q=${ query }&count=${ SEARCH_RESULT_LIMIT }`)
		.then((data) => {
			return res.status(200).json(lGet(JSON.parse(data), 'statuses'));
		})
		.catch((err) => {

			return res.status(err.statusCode).json({
				errors: err.data ?
					lGet(JSON.parse(err.data), 'errors', []).map(fGet('message')) : [
						'Unable to retrieve Tweets.'
					]
			});
		});
};

function searchRequest (url) {

	return new Promise((res, rej) => {

		oAuth.get(
			url, // Request URL
			TWITTER_OAUTH_TOKEN, // oAuth Token
			TWITTER_OAUTH_SECRET, // oAuth Secret
			(err, data) => {

				if (err) {
					return rej(err);
				}

				return res(data);
			}
		);

	});
}