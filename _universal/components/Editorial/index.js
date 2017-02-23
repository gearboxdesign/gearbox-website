import React from 'react'; // eslint-disable-line no-unused-vars
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
			styles= { styles }
			{ ...ariaAttrs }
		>
			<div
				className={ bemClass.element('inner') }
				dangerouslySetInnerHTML={ {
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
	styles: React.PropTypes.object.isRequired
};

export default BemClasses(Editorial);