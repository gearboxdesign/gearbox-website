/* global FB */

import React from 'react';

const FACEBOOK_TYPE = 'facebook',
	TWITTER_TYPE = 'twitter',
	LINKEDIN_TYPE = 'linkedIn';

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

	return SocialButton;
}

function getSocialAction (type) {

	switch (type) {
		case FACEBOOK_TYPE : {
			return facebookShare;
		}
		default: {
			return null;
		}
	}
}

function facebookShare (evt) {

	evt.preventDefault();

	FB.ui({
		method: 'share'
	});
}