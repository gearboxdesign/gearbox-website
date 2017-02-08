/* global FB */

import React from 'react';

const FACEBOOK_TYPE = 'facebook',
	TWITTER_TYPE = 'twitter';

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

	SocialButton.defaultProps = {};

	SocialButton.propTypes = {
		type: React.PropTypes.string
	};

	const componentName = Component.displayName ||
		Component.name ||
		'Component';

	SocialButton.displayName = `socialButton(${ componentName })`;

	return SocialButton;
}

function getSocialAction (type) {

	switch (type) {
		case FACEBOOK_TYPE : { return facebookShare; }
		case TWITTER_TYPE : { return twitterShare; }
		default: { return null; }
	}
}

function facebookShare (evt) {

	evt.preventDefault();

	FB.ui({
		method: 'share',
		href: document.location.href
	});
}

function twitterShare (evt) {

	evt.preventDefault();

	window.open(`https://twitter.com/intent/tweet?url=${ encodeURI(document.location.href) }`, '_blank');
}

