import React from 'react';
import LinkContainer from 'containers/LinkContainer';
import BemClasses from 'components/hoc/BemClasses';
import propTypes from 'components/lib/propTypes';
import getAriaAttrs from 'components/lib/getAriaAttrs';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function ActionLink (props) {

	const { aria, bemClass, className, label, url } = props,
		ariaAttrs = getAriaAttrs(aria);

	return (
		<LinkContainer
			activeClassName={ 'is-active' }
			className={ className }
			to={ url }
			{ ...ariaAttrs }
		>
			<span className={ bemClass.element('inner') }>{ label }</span>
		</LinkContainer>
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
	url: React.PropTypes.string.isRequired
};

const WrappedActionLink = BemClasses(ActionLink);

export default WrappedActionLink;