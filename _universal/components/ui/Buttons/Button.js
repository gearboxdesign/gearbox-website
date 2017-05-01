import React from 'react';
import propTypes from 'components/lib/propTypes';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

export default function (Component) {

	function Button (props) {

		return (
			<Component { ...props } />
		);
	}

	Button.defaultProps = {
		disabled: false
	};

	Button.propTypes = {
		aria: propTypes.aria,
		clickHandler: React.PropTypes.func.isRequired,
		disabled: React.PropTypes.bool.isRequired,
		label: React.PropTypes.string.isRequired
	};

	const componentName = Component.displayName ||
		Component.name ||
		'Component';

	Button.displayName = `button(${ componentName })`;

	Button.wrappedComponent = Component;

	return Button;
}