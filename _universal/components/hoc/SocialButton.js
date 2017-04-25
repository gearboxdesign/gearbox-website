/* global FB */

import React from 'react';

const FACEBOOK_SHARE = 'facebook-share',
	TWITTER_SHARE = 'twitter-share',
	TWITTER_TWEET = 'twitter-tweet';

export default function (Component) {

	function SocialButton (props) {

		const { type } = props;

		return (
			<Component
				clickHandler={ getSocialAction(type) }
				{ ...props }
			/>
		);
	}

	SocialButton.FACEBOOK_SHARE = FACEBOOK_SHARE;
	SocialButton.TWITTER_SHARE = TWITTER_SHARE;
	SocialButton.TWITTER_TWEET = TWITTER_TWEET;

	SocialButton.defaultProps = {};

	SocialButton.propTypes = {
		type: React.PropTypes.oneOf([
			FACEBOOK_SHARE,
			TWITTER_SHARE,
			TWITTER_TWEET
		])
	};

	const componentName = Component.displayName ||
		Component.name ||
		'Component';

	SocialButton.displayName = `socialButton(${ componentName })`;

	SocialButton.wrappedComponent = Component;

	return SocialButton;
}

function getSocialAction (type) {

	/* eslint-disable indent */
	switch (type) {
		case FACEBOOK_SHARE : {
			return facebookShare;
		}
		case TWITTER_SHARE : {
			return twitterShare;
		}
		case TWITTER_TWEET : {
			return twitterTweet;
		}
		default: {
			return null;
		}
	}

	/* eslint-enable-indent */
}

function facebookShare (evt) {

	evt.preventDefault();

	FB.ui({
		method: 'share',
		href: document.location.href
	});
}

function twitterTweet (evt) {

	evt.preventDefault();

	window.open(`https://twitter.com/intent/tweet?text=${ encodeURIComponent(`@${ process.env.TWITTER_USER } `) }`, '_blank');
}

function twitterShare (evt) {

	evt.preventDefault();

	window.open(`https://twitter.com/intent/tweet?url=${ encodeURIComponent(document.location.href) }`, '_blank');
}

