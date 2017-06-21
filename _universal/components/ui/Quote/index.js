import React from 'react';
import BemClasses from 'components/hoc/BemClasses';
import Editorial from 'components/ui/Editorial';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function Quote (props) {

	const { aria, bemClass, className, from, style, text } = props,
		ariaAttrs = getAriaAttrs(aria);

	return (
		<blockquote
			className={ className }
			style={ style }
			{ ...ariaAttrs }
		>
			<Editorial
				classes={ bemClass.element('body') }
				content={ text }
			/>
			<footer className={ bemClass.element('footer') }>
				<cite className={ bemClass.element('from') }>{ from }</cite>
			</footer>
		</blockquote>
	);
}

Quote.defaultProps = {
	className: 'c-quote',
	style: {}
};

Quote.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	from: React.PropTypes.string.isRequired,
	style: React.PropTypes.object.isRequired,
	text: React.PropTypes.string.isRequired
};

export default BemClasses(Quote);