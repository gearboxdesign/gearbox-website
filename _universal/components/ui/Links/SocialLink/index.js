import React from 'react';
import BemClasses from 'components/hoc/BemClasses';
import SocialButton from 'components/hoc/SocialButton';
import propTypes from 'components/lib/propTypes';
import getAriaAttrs from 'components/lib/getAriaAttrs';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function SocialLink (props) {

	const { aria, className, clickHandler, label, url } = props,
		ariaAttrs = getAriaAttrs(aria);

	return (
		<a
			className={ className }
			href={ url }
			onClick={ clickHandler }
			{ ...ariaAttrs }
		>
			{ label }
		</a>
	);
}

SocialLink.defaultProps = {
	className: 'c-social-link'
};

SocialLink.propTypes = {
	aria: propTypes.aria,
	className: React.PropTypes.string.isRequired,
	clickHandler: React.PropTypes.func,
	label: React.PropTypes.string.isRequired,
	url: React.PropTypes.string.isRequired
};

export default SocialButton(BemClasses(SocialLink));
