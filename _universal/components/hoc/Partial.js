import React from 'react';

export default function (Component, baseProps) {

	function Partial (props) {

		return (
			<Component
				{ ...Object.assign({}, baseProps, props) }
			/>
		);
	}

	const componentName = Component.displayName ||
		Component.name ||
		'Component';

	Partial.displayName = `partial(${ componentName })`;

	Partial.wrappedComponent = Component;

	return Partial;
}