import React from 'react'; // eslint-disable-line no-unused-vars
import BemClasses from 'components/hoc/BemClasses';
import Button from 'components/hoc/Button';
import propTypes from 'components/lib/propTypes';
import getAriaAttrs from 'components/lib/getAriaAttrs';

if (process.env.CLIENT) {
	require('../styles.scss');
}

function ToggleButton (props) {

	const { active, aria, className, clickHandler, enabled, label } = props,
		ariaAttrs = getAriaAttrs(aria);

	return (
		<button className={ active ? `${ className } is-active` : className }
			onClick={ clickHandler }
			{ ...ariaAttrs }
		>
			{ label }
		</button>
	);
}

ToggleButton.defaultProps = {
	className: 'c-button'
};

ToggleButton.propTypes = {
	active: React.PropTypes.bool.isRequired,
	aria: propTypes.aria,
	className: React.PropTypes.string.isRequired,
	clickHandler: React.PropTypes.func.isRequired,
	enabled: React.PropTypes.bool.isRequired,
	label: React.PropTypes.string.isRequired
};

export default Button(BemClasses(ToggleButton, {
	modifiers: 'toggle'
}));