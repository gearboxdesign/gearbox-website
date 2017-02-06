import React from 'react'; // eslint-disable-line no-unused-vars
import BemClasses from 'components/hoc/BemClasses';
import SocialButton from 'components/hoc/SocialButton';
import propTypes from 'components/lib/propTypes';
import getAriaAttrs from 'components/lib/getAriaAttrs';

// TODO: Consider making available modifiers static props.

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function SocialLink (props) {

	const { aria, bemClass, className, clickHandler, label, to } = props,
		ariaAttrs = getAriaAttrs(aria);

	return (
		<a
			className={ className }
			href={ to }
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
	bemClass: propTypes.bemClass,
	className: React.PropTypes.string.isRequired,
	clickHandler: React.PropTypes.func,
	label: React.PropTypes.string.isRequired,
	to: React.PropTypes.string.isRequired
};

export default SocialButton(BemClasses(SocialLink));
