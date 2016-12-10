import React from 'react';
import propTypes from 'components/lib/propTypes';

export default function (Component, opts = {}) {

	function Button (props) {

		return (
			<Component { ...props } />
		);
	}

	Button.defaultProps = {
		enabled: true
	};

	Button.propTypes = {
		aria: propTypes.aria,
		clickHandler: React.PropTypes.func.isRequired,
		enabled: React.PropTypes.bool.isRequired,
		label: React.PropTypes.string.isRequired
	};

	return Button;
}