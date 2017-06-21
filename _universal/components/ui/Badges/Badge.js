import React from 'react';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

export default function (Component) {

	function Badge (props) {

		return (
			<Component { ...props } />
		);
	}

	Badge.defaultProps = {
		index: 0
	};

	Badge.propTypes = {
		index: React.PropTypes.number.isRequired
	};

	const componentName = Component.displayName ||
		Component.name ||
		'Component';

	Badge.displayName = `badge(${ componentName })`;

	Badge.wrappedComponent = Component;

	return Badge;
}