import React from 'react';
import getChildElement from 'lib/getChildElement';

export default function (Component, options = {}) { // eslint-disable-line no-unused-vars

	function Components (props) {

		/**
		 * NOTE: Children will only be created from the 'components' prop
		 * 	if the children prop is undefined, otherwise it is disregarded.
		 */
		const { children, components = [], ...restProps } = props,
			componentProps = Object.assign({}, restProps, {
				children: children || components.map(getChildElement)
			});

		return <Component { ...componentProps } />;
	}

	Components.propTypes = {
		children: React.PropTypes.node,
		components: React.PropTypes.array
	};

	const componentName = Component.displayName ||
		Component.name ||
		'Component';

	Components.displayName = `components(${ componentName })`;

	Components.wrappedComponent = Component;

	return Components;
}