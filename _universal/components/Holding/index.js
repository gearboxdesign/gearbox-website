import React from 'react'; // eslint-disable-line no-unused-vars
import BemClasses from 'components/hoc/BemClasses';
import propTypes from 'components/lib/propTypes';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import Logo from 'components/Logo';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function Holding (props) {

	/* eslint-disable no-unused-vars */
	const { aria, bemClass, className, title } = props,
		ariaAttrs = getAriaAttrs(aria);

	/* eslint-enable */

	return (
		<div className={ className }>
			<Logo modifiers={ 'animated' } />
			<div className={ bemClass.element('detail') }>
				<h1 className={ bemClass.element('heading') }>{ title }</h1>
			</div>
		</div>
	);
}

Holding.defaultProps = {
	className: 'c-holding'
};

Holding.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	title: React.PropTypes.string.isRequired
};

export default BemClasses(Holding);