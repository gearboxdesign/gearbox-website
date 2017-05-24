import React from 'react';
import Remarkable from 'remarkable';
import BemClasses from 'components/hoc/BemClasses';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

const md = new Remarkable();

function Editorial (props) {

	const { aria, bemClass, className, content, styles } = props,
		ariaAttrs = getAriaAttrs(aria);

	return (
		<div
			className={ className }
			style={ styles }
			{ ...ariaAttrs }
		>
			<div
				className={ bemClass.element('inner') }
				dangerouslySetInnerHTML={ { // eslint-disable-line react/no-danger
					__html: md.render(content)
				} }
			/>
		</div>
	);
}

Editorial.defaultProps = {
	className: 'c-editorial',
	styles: {}
};

Editorial.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	content: React.PropTypes.string.isRequired,
	style: React.PropTypes.object
};

export default BemClasses(Editorial);