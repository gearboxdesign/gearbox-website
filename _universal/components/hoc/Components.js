import React from 'react'; // eslint-disable-line no-unused-vars
import { get } from 'lodash';
import getComponent from 'lib/getComponent';
import ErrorComponent from 'components/Error';

export default function (Component, options = {}) { // eslint-disable-line no-unused-vars

	function Components (props) {

		/**
		 * NOTE: Children will only be created from the 'components' prop
		 * 	if the children prop is undefined, otherwise it is disregarded.
		 */
		const { children, components = [], ...restProps } = props,
			componentProps = Object.assign({}, restProps, {
				children: children || components.map(getChildComponent)
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

function getChildComponent (props, i) {

	const componentId = get(props, 'meta.componentId'),
		id = get(props, 'meta.id');

	if (componentId) {

		try {

			const Component = getComponent(componentId);

			return (
				<Component
					index={ i }
					key={ id }
					{ ...props }
				/>
			);
		}
		catch (err) {

			return (
				<ErrorComponent
					errors={ [err.message] }
					key={ id }
				/>
			);
		}
	}

	return (
		<ErrorComponent
			errors={ [`componentId is not defined for entry: ${ id }.`] }
			key={ id }
		/>
	);
}

