import React from 'react'; // eslint-disable-line no-unused-vars
import BemClasses from 'components/hoc/BemClasses';
import Button from 'components/hoc/Button';
import propTypes from 'components/lib/propTypes';
import getAriaAttrs from 'components/lib/getAriaAttrs';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('../styles.scss');
}

/* eslint-enable */

function ToggleButton (props) {

	const { active, aria, bemClass, className, clickHandler, disabled, label } = props,
		ariaAttrs = getAriaAttrs(aria);

	return (
		<button
			className={ active ? `${ className } is-active` : className }
			disabled={ disabled }
			onClick={ clickHandler }
			type="button"
			{ ...ariaAttrs }
		>
			<span className={ bemClass.element('inner') }>{ label }</span>
		</button>
	);
}

ToggleButton.defaultProps = {
	className: 'c-button'
};

ToggleButton.propTypes = {
	active: React.PropTypes.bool,
	aria: propTypes.aria,
	bemClass: propTypes.bemClass,
	className: React.PropTypes.string.isRequired,
	clickHandler: React.PropTypes.func.isRequired,
	disabled: React.PropTypes.bool.isRequired,
	label: React.PropTypes.string.isRequired
};

export default Button(BemClasses(ToggleButton, {
	modifiers: 'toggle'
}));