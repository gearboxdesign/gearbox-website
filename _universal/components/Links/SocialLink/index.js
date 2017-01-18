import React from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router';
import BemClasses from 'components/hoc/BemClasses';
import propTypes from 'components/lib/propTypes';
import getAriaAttrs from 'components/lib/getAriaAttrs';

// TODO: Consider making available modifiers static props.

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function SocialLink (props) {

	const { aria, bemClass, className, label, to } = props,
		ariaAttrs = getAriaAttrs(aria);

	return (
		<Link
			className={ className }
			to={ to }
			{ ...ariaAttrs }
		>
			{ label }
		</Link>
	);
}

SocialLink.defaultProps = {
	className: 'c-social-link'
};

SocialLink.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass,
	className: React.PropTypes.string.isRequired,
	label: React.PropTypes.string.isRequired,
	to: React.PropTypes.string.isRequired
};

export default BemClasses(SocialLink);
