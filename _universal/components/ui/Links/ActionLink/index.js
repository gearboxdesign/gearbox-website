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

const MODIFIER_EXAMPLE = 'example';

function ActionLink (props) {

	const { aria, bemClass, className, label, to } = props,
		ariaAttrs = getAriaAttrs(aria);

	return (
		<Link
			activeClassName={ 'is-active' }
			className={ className }
			to={ to }
			{ ...ariaAttrs }
		>
			<span className={ bemClass.element('inner') }>{ label }</span>
		</Link>
	);
}

ActionLink.defaultProps = {
	className: 'c-action-link'
};

ActionLink.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass,
	className: React.PropTypes.string.isRequired,
	label: React.PropTypes.string.isRequired,
	to: React.PropTypes.string.isRequired
};

const WrappedActionLink = BemClasses(ActionLink);

WrappedActionLink.MODIFIER_EXAMPLE = MODIFIER_EXAMPLE;

export default WrappedActionLink;