import React from 'react'; // eslint-disable-line no-unused-vars
import BemClasses from 'components/hoc/BemClasses';
import propTypes from 'components/lib/propTypes';
import getAriaAttrs from 'components/lib/getAriaAttrs';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function Tweet (props) {

	const { aria, bemClass, className, text } = props,
		ariaAttrs = getAriaAttrs(aria);

	return (
		<blockquote
			className={ className }
			{ ...ariaAttrs }
		>
			<p className={ bemClass.element('inner') }>
				{ text }
			</p>
			<cite className={ bemClass.element('cite') }>
				{ process.env.TWITTER_USER }
			</cite>
		</blockquote>
	);
}

Tweet.defaultProps = {
	className: 'c-tweet'
};

Tweet.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	text: React.PropTypes.string.isRequired
};

export default BemClasses(Tweet);