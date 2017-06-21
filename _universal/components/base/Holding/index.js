import React from 'react';
import BemClasses from 'components/hoc/BemClasses';
import propTypes from 'components/lib/propTypes';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import Heading from 'components/ui/Heading';
import Logo from 'components/ui/Logo';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function Holding (props) {

	/* eslint-disable no-unused-vars */
	const { aria, bemClass, className, heading } = props,
		ariaAttrs = getAriaAttrs(aria);

	/* eslint-enable */

	return (
		<div className={ className }>
			<Logo
				classes={ bemClass.element('logo') }
				modifiers={ 'animated' }
			/>
			<div className={ bemClass.element('detail') }>
				<Heading
					classes={ bemClass.element('heading') }
					text={ heading }
				/>
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
	heading: React.PropTypes.string.isRequired
};

export default BemClasses(Holding);