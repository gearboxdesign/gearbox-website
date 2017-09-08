import React from 'react';
import BemClasses from 'components/hoc/BemClasses';
import propTypes from 'components/lib/propTypes';
import getAriaAttrs from 'components/lib/getAriaAttrs';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function Tag (props) {

	const { aria, className, text } = props,
		ariaAttrs = getAriaAttrs(aria);

	return (
		<p
			className={ className }
			{ ...ariaAttrs }
		>
			{ text }
		</p>
	);
}

Tag.defaultProps = {
	className: 'c-tag'
};

Tag.propTypes = {
	aria: propTypes.aria,
	className: React.PropTypes.string.isRequired,
	text: React.PropTypes.string.isRequired
};

export default BemClasses(Tag);